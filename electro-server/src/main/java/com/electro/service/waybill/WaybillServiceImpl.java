package com.electro.service.waybill;

import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.constant.SearchFields;
import com.electro.dto.ListResponse;
import com.electro.dto.waybill.GhnOrderRequest;
import com.electro.dto.waybill.GhnOrderResponse;
import com.electro.dto.waybill.WaybillRequest;
import com.electro.dto.waybill.WaybillResponse;
import com.electro.entity.order.Order;
import com.electro.entity.order.OrderVariant;
import com.electro.entity.waybill.Waybill;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.waybill.WaybillMapper;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.waybill.WaybillRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class WaybillServiceImpl implements WaybillService {

    @Value("${electro.app.shipping.ghnToken}")
    private final String ghnToken;
    @Value("${electro.app.shipping.ghnShopId}")
    private final String ghnShopId;
    @Value("${electro.app.shipping.ghnApiPath}")
    private final String ghnApiPath;

    private OrderRepository orderRepository;
    private WaybillRepository waybillRepository;
    private WaybillMapper waybillMapper;

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
            throw new RuntimeException("This order already exists waybill. Please choose another order!");
        }

        Order order = orderRepository.findById(waybillRequest.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.ID, waybillRequest.getOrderId()));

        // Tạo Waybill khi Order.status == 1
        if (order.getStatus() == 1) {
            String createOrderApiPath = ghnApiPath + "/shipping-order/create";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            headers.add("Token", ghnToken);
            headers.add("ShopId", ghnShopId);

            RestTemplate restTemplate = new RestTemplate();

            var request = new HttpEntity<>(buildGhnOrderRequest(waybillRequest, order), headers);
            var response = restTemplate.postForEntity(createOrderApiPath, request, GhnOrderResponse.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Error when calling Create Order GHN API");
            }

            if (response.getBody() != null) {
                Waybill waybill = waybillMapper.requestToEntity(waybillRequest);
                waybill.setCode(response.getBody().getData().getOrderCode()); // TODO: Update code from GHN
                waybill.setOrder(order);
                waybill.setExpectedDelivery(response.getBody().getData().getExpectedDeliveryTime()); // TODO: Get field expectedDelivery from response
                waybill.setStatus(1); // Status 1: Đang đợi lấy hàng
                waybill.setCodAmount(order.getTotalPay().intValue());
                Waybill waybillAfterSave = waybillRepository.save(waybill);

                order.setStatus(2); // Status 2: Đang đợi lấy hàng
                orderRepository.save(order);

                return waybillMapper.entityToResponse(waybillAfterSave);
            } else {
                throw new RuntimeException("Response from Create Order GHN API cannot use");
            }
        } else {
            throw new RuntimeException("Cannot create new waybill. Order already had waybill or cancelled before.");
        }
    }

    @Override
    public WaybillResponse save(Long id, WaybillRequest request) {
        return defaultSave(id, request, waybillRepository, waybillMapper, ResourceName.WAYBILL);
    }

    @Override
    public void delete(Long id) {
        waybillRepository.deleteById(id);
    }

    @Override
    public void delete(List<Long> ids) {
        waybillRepository.deleteAllById(ids);
    }

    private GhnOrderRequest buildGhnOrderRequest(WaybillRequest waybillRequest, Order order) {
        GhnOrderRequest ghnOrderRequest = new GhnOrderRequest();
        ghnOrderRequest.setPaymentTypeId(waybillRequest.getPaymentTypeId());
        ghnOrderRequest.setNote(waybillRequest.getNote());
        ghnOrderRequest.setRequiredNote(waybillRequest.getRequiredNote());
        ghnOrderRequest.setToName(order.getToName());
        ghnOrderRequest.setToPhone(order.getToPhone());
        ghnOrderRequest.setToAddress(order.getToAddress());
        ghnOrderRequest.setToWardName(order.getToWardName());
        ghnOrderRequest.setToDistrictName(order.getToDistrictName());
        ghnOrderRequest.setToProvinceName(order.getToProvinceName());
        ghnOrderRequest.setCodAmount(order.getTotalPay().intValue());
        ghnOrderRequest.setWeight(waybillRequest.getWeight());
        ghnOrderRequest.setLength(waybillRequest.getLength());
        ghnOrderRequest.setWidth(waybillRequest.getWidth());
        ghnOrderRequest.setHeight(waybillRequest.getHeight());
        ghnOrderRequest.setServiceTypeId(2);
        ghnOrderRequest.setServiceId(0);

        List<GhnOrderRequest.Item> items = new ArrayList<>();
        for (OrderVariant orderVariant : order.getOrderVariants()) {
            GhnOrderRequest.Item item = new GhnOrderRequest.Item();
            // TODO: Tên cần kết hợp với variantProperties
            item.setName(orderVariant.getVariant().getProduct().getName());
            item.setQuantity(orderVariant.getQuantity());
            item.setPrice(orderVariant.getVariant().getPrice().intValue());
            items.add(item);
        }
        ghnOrderRequest.setItems(items);

        return ghnOrderRequest;
    }

}
