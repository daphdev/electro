package com.electro.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
public class PaypalRequest implements Serializable {
    @JsonProperty("intent")
    private OrderIntent intent;
    @JsonProperty("purchase_units")
    private List<PurchaseUnit> purchaseUnits;
    @JsonProperty("application_context")
    private PayPalAppContext applicationContext;

    @Data
    @AllArgsConstructor
    public static class PurchaseUnit {
        @JsonProperty("amount")
        private Money amount;

        @Data
        @AllArgsConstructor
        public static class Money {
            @JsonProperty("currency_code")
            private String currencyCode;
            @JsonProperty("value")
            private String value;
        }
    }

    @Data
    @Accessors(chain = true)
    public static class PayPalAppContext {
        @JsonProperty("brand_name")
        private String brandName;
        @JsonProperty("landing_page")
        private PaymentLandingPage landingPage;
        @JsonProperty("return_url")
        private String returnUrl;
        @JsonProperty("cancel_url")
        private String cancelUrl;
    }
}
