package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.util.Set;

@Data
public class DocketResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private Integer type;
    private String code;
    private DocketReasonResponse reason;
    private WarehouseResponse warehouse;
    private Set<DocketVariantResponse> docketVariants;
    @Nullable
    private DocketResponse.PurchaseOrderResponse purchaseOrder;
    @Nullable
    private DocketResponse.OrderResponse order;
    @Nullable
    private String note;
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
