package com.electro.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaypalCheckoutResponse {
    private String paypalUrl;
}
