package com.electro.service.order;

import com.electro.dto.client.ClientOrderRequest;

public interface OrderService {

    void cancelOrder(Long Id);

    String createClientOrder(ClientOrderRequest orderRequest);

    void captureTransactionPaypal(String token, String payerId);
}
