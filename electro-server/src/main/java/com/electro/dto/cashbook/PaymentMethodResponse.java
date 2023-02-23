package com.electro.dto.cashbook;

import com.electro.entity.cashbook.PaymentMethodType;
import lombok.Data;

import java.time.Instant;

@Data
public class PaymentMethodResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private PaymentMethodType code;
    private Integer status;
}
