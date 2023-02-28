package com.electro.dto.client;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

@Data
public class ClientSimpleOrderResponse {
    private Long orderId;
    private Instant orderCreatedAt;
    private String orderCode;
    private Integer orderStatus;
    private BigDecimal orderTotalPay;
    private Set<ClientOrderVariantResponse> orderItems;
    private Integer orderPaymentStatus;
}
