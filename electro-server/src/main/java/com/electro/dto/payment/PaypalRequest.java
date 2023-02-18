package com.electro.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PaypalRequest implements Serializable {
    @JsonProperty("intent")
    private OrderIntent intent;

    @JsonProperty("purchase_units")
    private List<PurchaseUnit> purchaseUnits;

    @JsonProperty("application_context")
    private PayPalAppContextDTO applicationContext;

    @Data
    @AllArgsConstructor
    public static class PurchaseUnit {

        @JsonProperty("amount")
        private MoneyDTO amount;


        @Data
        @AllArgsConstructor
        public static class MoneyDTO {
            @JsonProperty("currency_code")
            private String currencyCode;

            @JsonProperty("value")
            private String value;
        }
    }

    @Data
    public static class PayPalAppContextDTO {

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