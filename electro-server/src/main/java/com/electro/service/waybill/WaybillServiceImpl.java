package com.electro.service.waybill;

import com.electro.dto.ListResponse;
import com.electro.dto.waybill.GhnOrderRequest;
import com.electro.dto.waybill.GhnOrderResponse;
import com.electro.dto.waybill.WaybillRequest;
import com.electro.dto.waybill.WaybillResponse;
import com.electro.entity.order.Order;
import com.electro.entity.order.OrderVariant;
import com.electro.entity.waybill.Waybill;
import com.electro.mapper.waybill.WaybillMapper;
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
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional(rollbackOn = {Exception.class, Throwable.class, SQLException.class})
public class WaybillServiceImpl implements WaybillService{
    public  static final String TOKEN="cee52cd3-8a9d-11ed-9ccc-a2c11deda90c";
    public  static final String SHOP_ID="121327";
    public  static final String URL_GHN="https://dev-online-gateway.ghn.vn/shiip/public-api/v2";

    private OrderRepository orderRepository;
    private WaybillRepository waybillRepository;
    private WaybillMapper waybillMapper;


    @Override
    public ListResponse<WaybillResponse> findAll(int page, int size, String sort, String filter, String search, boolean all) {
        return null;
    }

    @Override
    public WaybillResponse findById(Long aLong) {
        return null;
    }

    @Override
    public WaybillResponse save(WaybillRequest waybillRequest) {
        Optional<Waybill> waybillCheck = waybillRepository.findByOrder_Id(waybillRequest.getOrderId());
        if (waybillCheck.isPresent()){
            throw new InternalException("This order already exists waybill. Please choose another order");
        }

        Order order = orderRepository.findById(waybillRequest.getOrderId()).orElseThrow(()-> new InternalException("Order id: "+ waybillRequest.getOrderId() +" is not exist in database "));
        // waybill can create when order.status = 1 else throw error
        if (order.getStatus() == 1){
            Waybill waybill = waybillMapper.requestToEntity(waybillRequest);
            try{
                URI uri = new URI(URL_GHN +  "/shipping-order/create");

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                headers.add("Token", TOKEN);
                headers.add("ShopId", SHOP_ID);

                GhnOrderRequest body = generateGhnOrderRequest(waybillRequest, order);

                //  RestTemplateAPI restTemplateAPI = new RestTemplateAPI(uri, headers, body);
                RestTemplate restTemplate = new RestTemplate();
                HttpEntity<GhnOrderRequest> request = new HttpEntity<GhnOrderRequest>(body, headers);
                ResponseEntity<GhnOrderResponse> response = restTemplate.postForEntity(uri, request, GhnOrderResponse.class);
                if(response.getStatusCode() != HttpStatus.OK){
                    throw new Exception("Error GHN API: " + Objects.requireNonNull(response.getBody()).getMessage());
                }

                waybill.setCode(response.getBody().getData().getOrderCode()); // TODO: Update code from ghn
                waybill.setExpectedDelivery(response.getBody().getData().getExpectedDeliveryTime()); // TODO: get fieldExpectedDelivery from response
                waybill.setOrder(order);
                waybill.setStatus(1); // 1: đang đợi lấy hàng -> 2 là đang giao -> 3 đã giao hàng  | 4 là đã hủy
                waybill.setCodAmount(order.getTotalPay().intValue());
                waybill.setToName(order.getToName());
                waybill.setToPhone(order.getToPhone());
                waybill.setToAddress(order.getToAddress());
                waybill.setToWardName(order.getToWardName());
                waybill.setToProvinceName(order.getToProvinceName());

                waybill = waybillRepository.save(waybill);

                // Update waybill and status
                order.setStatus(2); // 1 chờ -> 2 đang đợi lấy hàng -> 3 đang giao  -> 4  đã giao hàng | 5 hủy
                orderRepository.save(order);
            }catch (URISyntaxException uri){
                throw new InternalException("incorrect url giao hang nhanh" + uri);
            }catch (RestClientException rest){
                throw new InternalException("something wrong when call giaohangnhanh api" + rest);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return waybillMapper.entityToResponse(waybill);
        }else{
            throw new InternalException("Cannot create new waybill. Order already have waybill or cancel " );
        }
    }

    @Override
    public WaybillResponse save(Long aLong, WaybillRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void delete(List<Long> longs) {

    }

    public GhnOrderRequest generateGhnOrderRequest(WaybillRequest waybill, Order order){
        GhnOrderRequest ghn = new GhnOrderRequest();
        ghn.setPaymentTypeId(waybill.getPaymentTypeId());
        ghn.setRequiredNote(waybill.getRequiredNote());
        ghn.setNote(waybill.getNote());
        ghn.setToName("mix");
        ghn.setToPhone("0909998877");
        ghn.setToAddress("Streaming house");
        ghn.setToWardName("Phường 14");
        ghn.setToDistrictName("Quận 10");
        ghn.setToProvinceName( "TP Hồ Chí Minh");
        ghn.setCodAmount( order.getTotalPay().intValue());
        ghn.setWeight(waybill.getWeight());
        ghn.setLength(waybill.getLength());
        ghn.setWidth(waybill.getWidth());
        ghn.setHeight(waybill.getHeight());
        ghn.setServiceTypeId(2);
        ghn.setServiceId(0);
        List<GhnOrderRequest.Item> items = new ArrayList<GhnOrderRequest.Item>();
        for(OrderVariant orderVariant : order.getOrderVariants()){
            GhnOrderRequest.Item item  = new GhnOrderRequest.Item();
            item.setName(orderVariant.getVariant().getProduct().getName());
            item.setQuantity(orderVariant.getQuantity());
            item.setPrice((int) Math.round(orderVariant.getVariant().getPrice()));
            items.add(item);
        }
        ghn.setItems(items);
        return ghn;
    }

}
