package com.electro.service.order;

import com.electro.config.payment.paypal.PayPalHttpClient;
import com.electro.constant.AppConstants;
import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.client.ClientOrderRequest;
import com.electro.dto.payment.OrderIntent;
import com.electro.dto.payment.OrderStatus;
import com.electro.dto.payment.PaymentLandingPage;
import com.electro.dto.payment.PaypalRequest;
import com.electro.dto.payment.PaypalResponse;
import com.electro.dto.waybill.GhnCancelOrderRequest;
import com.electro.dto.waybill.GhnCancelOrderResponse;
import com.electro.entity.order.Order;
import com.electro.entity.waybill.Waybill;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.client.ClientOrderMapper;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.waybill.WaybillRepository;
import lombok.RequiredArgsConstructor;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    @Value("${electro.app.shipping.ghnToken}")
    private String ghnToken;
    @Value("${electro.app.shipping.ghnShopId}")
    private String ghnShopId;
    @Value("${electro.app.shipping.ghnApiPath}")
    private String ghnApiPath;

    private final OrderRepository orderRepository;
    private final WaybillRepository waybillRepository;
    private final PayPalHttpClient payPalHttpClient;
    private final ClientOrderMapper clientOrderMapper;

    @Override
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.ID, id));

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
                        }
                    }
                }
            }
        } else {
            throw new RuntimeException(String
                    .format("Order with ID %s is in delivery or has been cancelled. Please check again!", id));
        }
    }

    @Override
    public String createClientOrder(ClientOrderRequest orderRequest) {
        // TODO: CHECK PAYMENT TYPE CASHER OR PAYPAL

        try{
            // TODO: NEED CHECK RATE AND ROUND NUMBER
            BigDecimal totalPayUSD = orderRequest.getTotalPay().divide(new BigDecimal("23000"),0, RoundingMode.HALF_UP);

            List<PaypalRequest.PurchaseUnit> purchaseUnits = new ArrayList<>();
            purchaseUnits.add(new PaypalRequest.PurchaseUnit(new PaypalRequest.PurchaseUnit.MoneyDTO("USD", totalPayUSD.toString())));
            PaypalRequest paypalRequest = new PaypalRequest();
            paypalRequest.setIntent(OrderIntent.CAPTURE);
            paypalRequest.setPurchaseUnits(purchaseUnits);

            // TODO: UPDATE CANCEL AND SUCCESS URL
            var appContext = new PaypalRequest.PayPalAppContextDTO();
            appContext.setReturnUrl(AppConstants.SERVER + "/client-api/orders/success"); // url backend
            appContext.setCancelUrl(AppConstants.SERVER + "/api/checkout/cancel"); // url frontend
            appContext.setBrandName("Electro");
            appContext.setLandingPage(PaymentLandingPage.BILLING);
            paypalRequest.setApplicationContext(appContext);
            var paypalResponse = payPalHttpClient.createPaypalTransaction(paypalRequest);

            orderRequest.setPaypalOrderId(paypalResponse.getId());
            orderRequest.setPaypalOrderStatus(paypalResponse.getStatus().toString());

            Order order = clientOrderMapper.requestToEntity(orderRequest);
            orderRepository.save(order);

            for (PaypalResponse.LinkDTO link: paypalResponse.getLinks()) {
                if (link.getRel().equals("approve")){
                    return link.getHref();
                }
            }
        }catch (Exception e){
            throw new RuntimeException("Cannot create paypal!" + e);
        }
        return null;
    }

    @Override
    public void captureTransactionPaypal(String paypalOrderId, String payerId) {
        Order order = orderRepository.findByPaypalOrderId(paypalOrderId)
                .orElseThrow(() -> new RuntimeException("Not found order with paypal order Id: " + paypalOrderId));
        order.setPaypalOrderStatus(OrderStatus.APPROVED.toString());
        order = orderRepository.save(order);

        try {
            payPalHttpClient.capturePaypalTransaction(paypalOrderId, payerId);
            order.setPaypalOrderStatus(OrderStatus.COMPLETED.toString());

            // TODO: update order.isPay = true;

            orderRepository.save(order);
        }catch (Exception e){
            throw new RuntimeException("Cannot capture transaction: " + e);
        }
    }
}
