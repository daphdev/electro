package com.electro.dto.client;

import com.electro.dto.order.OrderVariantRequest;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class ClientOrderRequest {
    private String code;
    private Integer status;
    private String toName;
    private String toPhone;
    private String toAddress;
    private String toWardName;
    private String toDistrictName;
    private String toProvinceName;
    private Long orderResourceId;
    @Nullable
    private Long orderCancellationReasonId;
    @Nullable
    private String note;
    private Long userId;
    private Set<OrderVariantRequest> orderVariants;
    private BigDecimal totalAmount;
    private BigDecimal tax;
    private BigDecimal shippingCost;
    private BigDecimal totalPay;
    private String paypalOrderId;
    private String paypalOrderStatus;
}
