package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;

@Data
public class DocketVariantEliminatedResponse {
    private DocketVariantEliminatedResponse.DocketResponse docket;
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
        private DocketVariantEliminatedResponse.DocketResponse.PurchaseOrderResponse purchaseOrder;
        @Nullable
        private DocketVariantEliminatedResponse.DocketResponse.OrderResponse order;
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
}
