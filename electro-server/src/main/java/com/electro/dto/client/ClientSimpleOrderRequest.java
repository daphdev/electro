package com.electro.dto.client;

import com.electro.entity.cashbook.PaymentMethodType;
import lombok.Data;

@Data
public class ClientSimpleOrderRequest {
    private PaymentMethodType paymentMethodType;
}
