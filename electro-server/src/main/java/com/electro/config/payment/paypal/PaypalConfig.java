package com.electro.config.payment.paypal;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@RequiredArgsConstructor
public class PaypalConfig {

    @Value("${paypal.baseUrl}")
    private String baseUrl;

    @Value("${paypal.clientId}")
    private String clientId;

    @Value("${paypal.secret}")
    private String secret;

}
