package com.electro.dto.inventory;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;

@Data
public class PurchaseOrderVariantResponse {
    private PurchaseOrderVariantResponse.VariantResponse variant;
    private Double cost;
    private Integer quantity;
    private Double amount;

    @Data
    public static class VariantResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private PurchaseOrderVariantResponse.VariantResponse.ProductResponse product;
        private String sku;
        private Double cost;
        private Double price;
        @Nullable
        private JsonNode properties;
        private Integer status;

        @Data
        public static class ProductResponse {
            private Long id;
            private Instant createdAt;
            private Instant updatedAt;
            private String name;
            private String code;
            private String slug;
        }
    }
}
