package com.electro.dto.order;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class OrderVariantResponse {
    private OrderVariantResponse.VariantResponse variant;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal amount;

    @Data
    public static class VariantResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private OrderVariantResponse.VariantResponse.ProductResponse product;
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
