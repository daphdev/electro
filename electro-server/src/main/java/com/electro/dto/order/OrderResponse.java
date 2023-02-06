package com.electro.dto.order;

import com.electro.dto.authentication.UserResponse;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

@Data
public class OrderResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private String toName;
    private String toPhone;
    private String toAddress;
    private String toWardName;
    private String toDistrictName;
    private String toProvinceName;
    private Integer status;
    private OrderResourceResponse orderResource;
    @Nullable
    private OrderCancellationReasonResponse orderCancellationReason;
    @Nullable
    private String note;
    private OrderResponse.CustomerResponse customer;
    private Set<OrderVariantResponse> orderVariants;
    private BigDecimal totalAmount;
    private BigDecimal tax;
    private BigDecimal shippingCost;
    private BigDecimal totalPay;

    @Data
    public static class CustomerResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private UserResponse user;
    }
}
