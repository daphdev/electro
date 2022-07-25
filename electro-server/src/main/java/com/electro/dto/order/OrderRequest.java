package com.electro.dto.order;

import com.electro.dto.inventory.DocketRequest;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
public class OrderRequest {
    private String code;
    private Integer status;
    private Long orderResourceId;
    private Long orderCancellationReasonId;
    private String note;
    private Long customerId;
    private Set<OrderVariantRequest> orderVariants;
    private List<DocketRequest> dockets;
    private BigDecimal totalAmount;
    private BigDecimal shippingCost;
    private BigDecimal tax;
    private BigDecimal totalPay;

}
