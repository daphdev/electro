package com.electro.dto.order;

import com.electro.dto.customer.CustomerResponse;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

@Data
public class Order_DocketResponse {
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
    private BigDecimal totalAmount;
    private BigDecimal shippingCost;
    private BigDecimal tax;
    private BigDecimal totalPay;

}
