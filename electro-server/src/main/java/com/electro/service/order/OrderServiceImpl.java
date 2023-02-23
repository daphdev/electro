package com.electro.service.order;

import com.electro.config.payment.paypal.PayPalHttpClient;
import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.waybill.GhnCancelOrderRequest;
import com.electro.dto.waybill.GhnCancelOrderResponse;
import com.electro.entity.order.Order;
import com.electro.entity.waybill.Waybill;
import com.electro.entity.waybill.WaybillLog;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.client.ClientOrderMapper;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.waybill.WaybillLogRepository;
import com.electro.repository.waybill.WaybillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Value("${electro.app.shipping.ghnToken}")
    private String ghnToken;
    @Value("${electro.app.shipping.ghnShopId}")
    private String ghnShopId;
    @Value("${electro.app.shipping.ghnApiPath}")
    private String ghnApiPath;

    private final OrderRepository orderRepository;
    private final WaybillRepository waybillRepository;
    private final WaybillLogRepository waybillLogRepository;

    private final PayPalHttpClient payPalHttpClient;
    private final ClientOrderMapper clientOrderMapper;

    private static final int USD_VND_RATE = 23_000;

    @Override
    public void cancelOrder(String code) {
        Order order = orderRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.ORDER_CODE, code));

        // Hủy đơn hàng khi status = 1 hoặc 2
        if (order.getStatus() < 3) {
            order.setStatus(5); // Status 5 là trạng thái Hủy
            orderRepository.save(order);

            Waybill waybill = waybillRepository.findByOrderId(order.getId()).orElse(null);

            // Status 1 là Vận đơn đang chờ lấy hàng
            if (waybill != null && waybill.getStatus() == 1) {
                String cancelOrderApiPath = ghnApiPath + "/switch-status/cancel";

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.add("Token", ghnToken);
                headers.add("ShopId", ghnShopId);

                RestTemplate restTemplate = new RestTemplate();

                var request = new HttpEntity<>(new GhnCancelOrderRequest(List.of(waybill.getCode())), headers);
                var response = restTemplate.postForEntity(cancelOrderApiPath, request, GhnCancelOrderResponse.class);

                if (response.getStatusCode() != HttpStatus.OK) {
                    throw new RuntimeException("Error when calling Cancel Order GHN API");
                }

                if (response.getBody() != null) {
                    for (var data : response.getBody().getData()) {
                        if (data.getResult()) {
                            waybill.setStatus(4); // Status 4 là trạng thái Hủy
                            waybillRepository.save(waybill);

                            WaybillLog waybillLog = new WaybillLog();
                            waybillLog.setWaybill(waybill);
                            waybillLog.setPreviousStatus(waybill.getStatus()); // Status 1: Đang đợi lấy hàng
                            waybillLog.setCurrentStatus(4);
                            waybillLogRepository.save(waybillLog);
                        }
                    }
                }
            }
        } else {
            throw new RuntimeException(String
                    .format("Order with code %s is in delivery or has been cancelled. Please check again!", code));
        }
    }

    @Override
    public String createClientOrder(ClientOrderRequest clientOrderRequest) {
        // TODO: CHECK PAYMENT TYPE [CASH OR PAYPAL]

        try {
            // TODO: NEED CHECK RATE AND ROUND NUMBER
            // (0) Tính tổng tiền theo USD
            BigDecimal totalPayUSD = clientOrderRequest.getTotalPay()
                    .divide(BigDecimal.valueOf(USD_VND_RATE), 0, RoundingMode.HALF_UP);

            // (1) Tạo một yêu cầu giao dịch PayPal
            PaypalRequest paypalRequest = new PaypalRequest();
            paypalRequest.setIntent(OrderIntent.CAPTURE);
            paypalRequest.setPurchaseUnits(List.of(
                    new PaypalRequest.PurchaseUnit(
                            new PaypalRequest.PurchaseUnit.Money("USD", totalPayUSD.toString())
                    )
            ));
            // TODO: UPDATE CANCEL AND SUCCESS URL
            paypalRequest.setApplicationContext(new PaypalRequest.PayPalAppContext()
                    .setReturnUrl(AppConstants.SERVER + "/client-api/orders/success") // url backend
                    .setCancelUrl(AppConstants.SERVER + "/api/checkout/cancel") // url frontend
                    .setBrandName("Electro")
                    .setLandingPage(PaymentLandingPage.BILLING));

            PaypalResponse paypalResponse = payPalHttpClient.createPaypalTransaction(paypalRequest);

            // (2) Lưu order
            Order order = clientOrderMapper.requestToEntity(clientOrderRequest);
            order.setPaypalOrderId(paypalResponse.getId());
            order.setPaypalOrderStatus(paypalResponse.getStatus().toString());
            orderRepository.save(order);

            // (3) Trả về đường dẫn checkout cho user
            for (PaypalResponse.Link link : paypalResponse.getLinks()) {
                if (link.getRel().equals("approve")) {
                    return link.getHref();
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Cannot create PayPal transaction request!" + e);
        }

        return "";
    }

    @Override
    public void captureTransactionPaypal(String paypalOrderId, String payerId) {
        Order order = orderRepository.findByPaypalOrderId(paypalOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.PAYPAL_ORDER_ID, paypalOrderId));

        order.setPaypalOrderStatus(OrderStatus.APPROVED.toString());

        try {
            payPalHttpClient.capturePaypalTransaction(paypalOrderId, payerId);
            order.setPaypalOrderStatus(OrderStatus.COMPLETED.toString());
            // TODO: Update order.paymentStatus = 2;
        } catch (Exception e) {
            log.error("Cannot capture transaction: {0}", e);
        }

        orderRepository.save(order);
    }

}
