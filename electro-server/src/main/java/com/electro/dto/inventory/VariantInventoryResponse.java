package com.electro.dto.inventory;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.util.List;

@Data
public class VariantInventoryResponse {
    private VariantInventoryResponse.VariantResponse variant;
    private List<DocketVariantEliminatedResponse> transactions;
    private Integer inventory;
    private Integer waitingForDelivery;
    private Integer canBeSold;
    private Integer areComing;

    @Data
    public static class VariantResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private VariantInventoryResponse.VariantResponse.ProductResponse product;
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
