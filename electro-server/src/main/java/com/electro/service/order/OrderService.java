package com.electro.service.order;

import com.electro.dto.client.ClientOrderRequest;

public interface OrderService {

    void cancelOrder(Long Id);

    String createClientOrder(ClientOrderRequest clientOrderRequest);

    void captureTransactionPaypal(String paypalOrderId, String payerId);

}
