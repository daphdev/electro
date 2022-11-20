package com.electro.dto.order;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class OrderRequest {
    private String code;
    private Integer status;
    private Long orderResourceId;
    @Nullable
    private Long orderCancellationReasonId;
    @Nullable
    private String note;
    private Long customerId;
    private Set<OrderVariantRequest> orderVariants;
    private BigDecimal totalAmount;
    private BigDecimal tax;
    private BigDecimal shippingCost;
    private BigDecimal totalPay;
}
