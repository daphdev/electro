package com.electro.service.order;

import com.electro.dto.client.ClientOrderRequest;

public interface OrderService {

    void cancelOrder(String code);

    String createClientOrder(ClientOrderRequest clientOrderRequest);

    void captureTransactionPaypal(String paypalOrderId, String payerId);

}
