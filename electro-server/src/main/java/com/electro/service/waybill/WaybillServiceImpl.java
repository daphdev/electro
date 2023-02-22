package com.electro.service.waybill;

import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.constant.SearchFields;
import com.electro.dto.CollectionWrapper;
import com.electro.dto.ListResponse;
import com.electro.dto.waybill.GHNCallbackOrderRequest;
import com.electro.dto.waybill.GhnCreateOrderRequest;
import com.electro.dto.waybill.GhnCreateOrderResponse;
import com.electro.dto.waybill.GhnUpdateOrderRequest;
import com.electro.dto.waybill.GhnUpdateOrderResponse;
import com.electro.dto.waybill.WaybillRequest;
import com.electro.dto.waybill.WaybillResponse;
import com.electro.entity.cashbook.PaymentMethodType;
import com.electro.entity.general.Notification;
import com.electro.entity.general.NotificationType;
import com.electro.entity.order.Order;
import com.electro.entity.order.OrderVariant;
import com.electro.entity.waybill.Waybill;
import com.electro.entity.waybill.WaybillLog;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.general.NotificationMapper;
import com.electro.mapper.waybill.WaybillMapper;
import com.electro.repository.general.NotificationRepository;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.waybill.WaybillLogRepository;
import com.electro.repository.waybill.WaybillRepository;
import com.electro.service.general.NotificationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
@Transactional
public class WaybillServiceImpl implements WaybillService {

    @Value("${electro.app.shipping.ghnToken}")
    private String ghnToken;
    @Value("${electro.app.shipping.ghnShopId}")
    private String ghnShopId;
    @Value("${electro.app.shipping.ghnApiPath}")
    private String ghnApiPath;

    private static final int WAITING = 1;
    private static final int SHIPPING = 2;
    private static final int SUCCESS = 3;
    private static final int FAILED = 4;
    private static final int RETURN = 5;

    private final OrderRepository orderRepository;
    private final WaybillRepository waybillRepository;
    private final WaybillMapper waybillMapper;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final WaybillLogRepository waybillLogRepository;
    private static Map<String, Integer> statusCode;

    static {
        statusCode = new HashMap<>();
        statusCode.put("ready_to_pick", WAITING); //Mới tạo đơn hàng
        statusCode.put("picking", WAITING); //Nhân viên đang lấy hàng
        statusCode.put("cancel", FAILED); //Hủy đơn hàng
        statusCode.put("money_collect_picking", SHIPPING); //Đang thu tiền người gửi
        statusCode.put("picked", SHIPPING); //Nhân viên đã lấy hàng
        statusCode.put("transporting", SHIPPING); //Đang luân chuyển hàng
        statusCode.put("sorting", SHIPPING); //Đang phân loại hàng hóa
        statusCode.put("delivering", SHIPPING); //Nhân viên đang giao cho người nhận
        statusCode.put("money_collect_delivering", SHIPPING); //Nhân viên đang thu tiền người nhận
        statusCode.put("delivered", SUCCESS);   // Nhân viên đã giao hàng thành công
        statusCode.put("delivery_fail", FAILED); // Nhân viên giao hàng thất bại
        statusCode.put("waiting_to_return", RETURN); // Đang đợi trả hàng về cho người gửi
        statusCode.put("return", RETURN); //Trả hàng
        statusCode.put("return_transporting", RETURN); // Đang luân chuyển hàng trả
        statusCode.put("return_sorting", RETURN); // Đang phân loại hàng trả
        statusCode.put("returning", RETURN); // Nhân viên đang đi trả hàng
        statusCode.put("return_fail", RETURN); // Nhân viên trả hàng thất bại
        statusCode.put("returned", SUCCESS); // Nhân viên trả hàng thành công
        statusCode.put("exception", FAILED); // Đơn hàng ngoại lệ không nằm trong quy trình
        statusCode.put("damage", FAILED); // Hàng bị hư hỏng
        statusCode.put("lost", FAILED); // Hàng bị mất


    }

    @Override
    public ListResponse<WaybillResponse> findAll(int page, int size, String sort, String filter, String search, boolean all) {
        return defaultFindAll(page, size, sort, filter, search, all, SearchFields.WAYBILL, waybillRepository, waybillMapper);
    }

    @Override
    public WaybillResponse findById(Long id) {
        return defaultFindById(id, waybillRepository, waybillMapper, ResourceName.WAYBILL);
    }

    @Override
    public WaybillResponse save(WaybillRequest waybillRequest) {
        Optional<Waybill> waybillOpt = waybillRepository.findByOrderId(waybillRequest.getOrderId());

        if (waybillOpt.isPresent()) {
            throw new RuntimeException("This order already had a waybill. Please choose another order!");
        }

        Order order = orderRepository.findById(waybillRequest.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.ID, waybillRequest.getOrderId()));

        // Tạo Waybill khi Order.status == 1
        if (order.getStatus() == 1) {
            String createGhnOrderApiPath = ghnApiPath + "/shipping-order/create";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            headers.add("Token", ghnToken);
            headers.add("ShopId", ghnShopId);

            RestTemplate restTemplate = new RestTemplate();

            var request = new HttpEntity<>(buildGhnCreateOrderRequest(waybillRequest, order), headers);
            var response = restTemplate.postForEntity(createGhnOrderApiPath, request, GhnCreateOrderResponse.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Error when calling Create Order GHN API");
            }

            if (response.getBody() != null) {
                var ghnCreateOrderResponse = response.getBody();

                // (1) Tạo waybill
                Waybill waybill = waybillMapper.requestToEntity(waybillRequest);

                waybill.setCode(ghnCreateOrderResponse.getData().getOrderCode());
                waybill.setOrder(order);
                waybill.setExpectedDeliveryTime(ghnCreateOrderResponse.getData().getExpectedDeliveryTime());
                waybill.setStatus(1); // Status 1: Đang đợi lấy hàng
                waybill.setCodAmount(order.getTotalPay().intValue());
                waybill.setShippingFee(ghnCreateOrderResponse.getData().getTotalFee());
                waybill.setGhnPaymentTypeId(chooseGhnPaymentTypeId(order.getPaymentMethodType()));

                Waybill waybillAfterSave = waybillRepository.save(waybill);

                // (2) Sửa order
                order.setShippingCost(BigDecimal.valueOf(ghnCreateOrderResponse.getData().getTotalFee()));
                order.setTotalPay(BigDecimal.valueOf(
                        order.getTotalPay().intValue() + ghnCreateOrderResponse.getData().getTotalFee()));
                order.setStatus(2); // Status 2: Đang xử lý

                orderRepository.save(order);

                WaybillLog waybillLog = new WaybillLog();
                waybillLog.setWaybill(waybillAfterSave);
                waybillLog.setCurrentStatus(1); // Status 1: Đang đợi lấy hàng
                waybillLogRepository.save(waybillLog);

                // (3) Thông báo cho người dùng về việc đơn hàng đã được duyệt
                // với thông tin phí vận chuyển và sự thay đổi tổng tiền trả
                Notification notification = new Notification()
                        .setUser(order.getUser())
                        .setType(NotificationType.ORDER)
                        .setMessage(String.format(
                                "Đơn hàng %s của bạn đã được duyệt. Phí vận chuyển là %s. Tổng tiền cần trả là %s.",
                                order.getCode(),
                                NumberFormat.getCurrencyInstance(new Locale("vi", "VN"))
                                        .format(order.getShippingCost()),
                                NumberFormat.getCurrencyInstance(new Locale("vi", "VN"))
                                        .format(order.getTotalPay())))
                        .setAnchor("/order/detail/" + order.getCode())
                        .setStatus(1);

                notificationRepository.save(notification);

                notificationService.pushNotification(order.getUser().getUsername(),
                        notificationMapper.entityToResponse(notification));

                return waybillMapper.entityToResponse(waybillAfterSave);
            } else {
                throw new RuntimeException("Response from Create Order GHN API cannot use");
            }
        } else {
            throw new RuntimeException("Cannot create a new waybill. Order already had a waybill or was cancelled before.");
        }
    }

    @Override
    public WaybillResponse save(Long id, WaybillRequest waybillRequest) {
        Waybill waybill = waybillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.WAYBILL, FieldName.ID, id));

        String updateGhnOrderApiPath = ghnApiPath + "/shipping-order/update";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.add("Token", ghnToken);
        headers.add("ShopId", ghnShopId);

        RestTemplate restTemplate = new RestTemplate();

        var request = new HttpEntity<>(buildGhnUpdateOrderRequest(waybillRequest, waybill), headers);
        var response = restTemplate.postForEntity(updateGhnOrderApiPath, request, GhnUpdateOrderResponse.class);

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("Error when calling Update Order GHN API");
        }

        if (response.getBody() != null) {
            Waybill waybillAfterSave = waybillRepository.save(waybillMapper.partialUpdate(waybill, waybillRequest));
            return waybillMapper.entityToResponse(waybillAfterSave);
        } else {
            throw new RuntimeException("Response from Update Order GHN API cannot use");
        }
    }

    @Override
    public void delete(Long id) {
        waybillRepository.deleteById(id);
    }

    @Override
    public void delete(List<Long> ids) {
        waybillRepository.deleteAllById(ids);
    }

    private GhnCreateOrderRequest buildGhnCreateOrderRequest(WaybillRequest waybillRequest, Order order) {
        GhnCreateOrderRequest ghnCreateOrderRequest = new GhnCreateOrderRequest();

        ghnCreateOrderRequest.setPaymentTypeId(chooseGhnPaymentTypeId(order.getPaymentMethodType()));
        ghnCreateOrderRequest.setNote(waybillRequest.getNote());
        ghnCreateOrderRequest.setRequiredNote(waybillRequest.getGhnRequiredNote());
        ghnCreateOrderRequest.setToName(order.getToName());
        ghnCreateOrderRequest.setToPhone(order.getToPhone());
        ghnCreateOrderRequest.setToAddress(order.getToAddress());
        ghnCreateOrderRequest.setToWardName(order.getToWardName());
        ghnCreateOrderRequest.setToDistrictName(order.getToDistrictName());
        ghnCreateOrderRequest.setToProvinceName(order.getToProvinceName());
        ghnCreateOrderRequest.setCodAmount(order.getTotalPay().intValue()); // totalPay lúc này là tổng tiền tạm thời
        ghnCreateOrderRequest.setWeight(waybillRequest.getWeight());
        ghnCreateOrderRequest.setLength(waybillRequest.getLength());
        ghnCreateOrderRequest.setWidth(waybillRequest.getWidth());
        ghnCreateOrderRequest.setHeight(waybillRequest.getHeight());
        ghnCreateOrderRequest.setServiceTypeId(2);
        ghnCreateOrderRequest.setServiceId(0);
        ghnCreateOrderRequest.setPickupTime(waybillRequest.getShippingDate().getEpochSecond());

        List<GhnCreateOrderRequest.Item> items = new ArrayList<>();
        for (OrderVariant orderVariant : order.getOrderVariants()) {
            var item = new GhnCreateOrderRequest.Item();
            item.setName(buildGhnProductName(orderVariant.getVariant().getProduct().getName(),
                    orderVariant.getVariant().getProperties()));
            item.setQuantity(orderVariant.getQuantity());
            item.setPrice(orderVariant.getPrice().intValue());
            items.add(item);
        }
        ghnCreateOrderRequest.setItems(items);

        return ghnCreateOrderRequest;
    }

    // Trả về tên sản phẩm không trùng nhau
    // TH1: Chỉ có 1 phiên bản mặc định không có thuộc tính: Laptop Lenovo
    // TH2: Có ít nhất 1 phiên bản với thuộc tính: Laptop Lenovo (Kích cỡ: S, Màu sắc: Đỏ)
    @SuppressWarnings("unchecked")
    private String buildGhnProductName(String productName, @Nullable JsonNode variantProperties) {
        ObjectMapper mapper = new ObjectMapper();

        CollectionWrapper<LinkedHashMap<String, Object>> variantPropertiesObj;

        try {
            variantPropertiesObj = mapper.treeToValue(variantProperties, CollectionWrapper.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Cannot build product name for GHN order");
        }

        if (variantPropertiesObj == null) {
            return productName;
        }

        StringJoiner joiner = new StringJoiner(", ", "(", ")");

        for (var variantProperty : variantPropertiesObj.getContent()) {
            joiner.add(String.format("%s: %s", variantProperty.get("name"), variantProperty.get("value")));
        }

        return String.format("%s %s", productName, joiner);
    }

    private int chooseGhnPaymentTypeId(PaymentMethodType paymentMethodType) {
        return paymentMethodType == PaymentMethodType.CASH
                ? 2 // Thanh toán tiền mặt, người nhận trả tiền vận chuyển và tiền thu hộ
                : 1; // Thanh toán Paypal, Người gửi trả tiền vận chuyển
    }

    private GhnUpdateOrderRequest buildGhnUpdateOrderRequest(WaybillRequest waybillRequest, Waybill waybill) {
        GhnUpdateOrderRequest ghnUpdateOrderRequest = new GhnUpdateOrderRequest();

        ghnUpdateOrderRequest.setOrderCode(waybill.getCode());
        ghnUpdateOrderRequest.setNote(waybillRequest.getNote());
        ghnUpdateOrderRequest.setRequiredNote(waybillRequest.getGhnRequiredNote());

        return ghnUpdateOrderRequest;
    }

    @Override
    public void callbackStatusWaybillGHN(GHNCallbackOrderRequest callback) {
        if (callback.getShopID().equals(ghnShopId)){
        Waybill waybill = waybillRepository.findByCode(callback.getOrderCode()).orElseThrow(() -> new RuntimeException("Waybill not exist in db with code: " + callback.getOrderCode()));
        Order order = waybill.getOrder();
        WaybillLog waybillLog = new WaybillLog();
        waybillLog.setWaybill(waybill);
        int status = statusCode.get(callback.getStatus());
        switch (status) {
            case WAITING:
                waybillLog.setPreviousStatus(waybill.getStatus());
                waybillLog.setCurrentStatus(1);
                waybill.setStatus(1);
                order.setStatus(2);
                break;
            case SHIPPING:
                waybillLog.setPreviousStatus(waybill.getStatus());
                waybillLog.setCurrentStatus(2);
                waybill.setStatus(2);
                order.setStatus(3);
                break;
            case SUCCESS:
                // TODO: KHI HOÀN THÀNH ĐƠN HÀNG CẦN GỬI MAIL CHO KHÁCH HÀNG
                waybillLog.setPreviousStatus(waybill.getStatus());
                waybillLog.setCurrentStatus(3);
                waybill.setStatus(3);
                order.setStatus(4);
                break;
            case RETURN:
                // TODO: CẦN THỐNG NHẤT VỀ CÁCH TRẢ HÀNG. HOẶC HỦY ĐƠN HÀNG
                waybillLog.setPreviousStatus(waybill.getStatus());
                waybillLog.setCurrentStatus(4);
                waybill.setStatus(4);
                order.setStatus(5);
                break;
            default:
                throw new RuntimeException("Something went wrong!!");
        }

        waybillLogRepository.save(waybillLog);
        orderRepository.save(order);
        waybillRepository.save(waybill);
        }else{
            throw new RuntimeException("ShopId is not valid");
        }
    }
}
