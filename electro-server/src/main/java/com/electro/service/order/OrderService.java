package com.electro.service.order;

import com.electro.dto.client.ClientConfirmedOrderResponse;
import com.electro.dto.client.ClientSimpleOrderRequest;

public interface OrderService {

    void cancelOrder(String code);

    ClientConfirmedOrderResponse createClientOrder(ClientSimpleOrderRequest request);

    void captureTransactionPaypal(String paypalOrderId, String payerId);

}
