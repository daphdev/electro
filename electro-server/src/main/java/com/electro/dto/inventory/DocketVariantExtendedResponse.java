package com.electro.dto.inventory;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;

@Data
public class DocketVariantExtendedResponse {
    private DocketVariantExtendedResponse.DocketResponse docket;
    private DocketVariantExtendedResponse.VariantResponse variant;
    private Integer quantity;

    @Data
    public static class DocketResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private Integer type;
        private String code;
        private DocketReasonResponse reason;
        private WarehouseResponse warehouse;
        @Nullable
        private DocketVariantExtendedResponse.DocketResponse.PurchaseOrderResponse purchaseOrder;
        @Nullable
        private DocketVariantExtendedResponse.DocketResponse.OrderResponse order;
        private Integer status;

        @Data
        public static class PurchaseOrderResponse {
            private Long id;
            private Instant createdAt;
            private Instant updatedAt;
            private String code;
            private Integer status;
        }

        @Data
        public static class OrderResponse {
            private Long id;
            private Instant createdAt;
            private Instant updatedAt;
            private String code;
            private Integer status;
        }
    }

    @Data
    public static class VariantResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private String sku;
        @Nullable
        private JsonNode properties;
        private Integer status;
    }
}
