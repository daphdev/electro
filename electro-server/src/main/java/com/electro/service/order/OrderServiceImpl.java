package com.electro.service.order;

import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.waybill.GhnCancelOrderRequest;
import com.electro.dto.waybill.GhnCancelOrderResponse;
import com.electro.entity.order.Order;
import com.electro.entity.waybill.Waybill;
import com.electro.entity.waybill.WaybillLog;
import com.electro.exception.ResourceNotFoundException;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.waybill.WaybillLogRepository;
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
    private final WaybillLogRepository waybillLogRepository;

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
                            WaybillLog waybillLog = new WaybillLog();
                            waybillLog.setWaybill(waybill);
                            waybillLog.setPreviousStatus(waybill.getStatus()); // Status 1: Đang đợi lấy hàng

                            waybill.setStatus(4); // Status 4 là trạng thái Hủy
                            waybillLog.setCurrentStatus(4);

                            waybillRepository.save(waybill);
                            waybillLogRepository.save(waybillLog);
                        }
                    }
                }
            }
        } else {
            throw new RuntimeException(String
                    .format("Order with ID %s is in delivery or has been cancelled. Please check again!", id));
        }
    }

}
