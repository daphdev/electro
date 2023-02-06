package com.electro.service.order;

import com.electro.dto.waybill.GhnCancelOrder;
import com.electro.dto.waybill.GhnCancelOrderResponse;
import com.electro.entity.order.Order;
import com.electro.entity.waybill.Waybill;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.waybill.WaybillRepository;
import com.sun.jdi.InternalException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional(rollbackOn = {URISyntaxException.class, Exception.class, Throwable.class, SQLException.class})
public class OrderServiceImpl implements OrderService {
    public  static final String TOKEN="cee52cd3-8a9d-11ed-9ccc-a2c11deda90c";
    public  static final String SHOP_ID="121327";
    public  static final String URL_GHN="https://dev-online-gateway.ghn.vn/shiip/public-api/v2";

    private OrderRepository orderRepository;
    private WaybillRepository waybillRepository;

    @Override
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(()-> new InternalException("Not found order id: " + id));

        // cancel order when status = 1 or 2. else cant
        if (order.getStatus() < 3) {
            order.setStatus(5); // status 5 is cancel order
            orderRepository.save(order);
            Optional<Waybill> waybillOptional = waybillRepository.findByOrder_Id(order.getId());
            if (waybillOptional.isPresent()) {
                try {
                    Waybill waybill = waybillOptional.get();
                    if (waybill.getStatus() == 1) { // 1: đang đợi lấy hàng -> 2 là đang giao -> 3 đã giao hàng  | 4 là đã hủy
                        URI uri = new URI(URL_GHN + "/switch-status/cancel");
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_JSON);
                        headers.add("Token", TOKEN);
                        headers.add("ShopId", SHOP_ID);

                        List<String> orderCodes = new ArrayList<String>();
                        orderCodes.add(waybill.getCode());
                        GhnCancelOrder body = new GhnCancelOrder(orderCodes);

                        RestTemplate restTemplate = new RestTemplate();
                        HttpEntity<GhnCancelOrder> request = new HttpEntity<>(body, headers);
                        ResponseEntity<GhnCancelOrderResponse> response = restTemplate.postForEntity(uri, request, GhnCancelOrderResponse.class);
                        if (response.getStatusCode() != HttpStatus.OK) {
                            throw new InternalException("Error Cancel Order GHN API: " + Objects.requireNonNull(response.getBody()).getMessage());
                        }

                        for(GhnCancelOrderResponse.DataProp data : response.getBody().getData()){
                            if (data.getResult()){
                                waybill.setStatus(4); // 4: cancel waybill
                                waybillRepository.save(waybill);
                            }
                        }
                    }
                }catch (URISyntaxException uri){
                    throw new InternalException("incorrect url giao hang nhanh " + uri);
                }catch (RestClientException rest){
                    throw new InternalException("something wrong when call giaohangnhanh api " + rest);
                }catch(Exception e) {
                    e.printStackTrace();
                }
            }
        }else{
            throw new InternalException("Order " + id+" is  is in delivery or has been cancelled. Please check again!");
        }
    }

}
