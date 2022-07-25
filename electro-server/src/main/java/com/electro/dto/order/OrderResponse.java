package com.electro.dto.order;

import com.electro.dto.customer.CustomerResponse;
import com.electro.dto.inventory.Docket_OrderResponse;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
public class OrderResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private Integer status;
    private OrderResourceResponse orderResource;
    private OrderCancellationReasonResponse orderCancellationReason;
    private String note;
    private CustomerResponse customer;
    private Set<OrderVariantResponse> orderVariants;
    private List<Docket_OrderResponse> dockets;
    private BigDecimal totalAmount;
    private BigDecimal shippingCost;
    private BigDecimal tax;
    private BigDecimal totalPay;

}
