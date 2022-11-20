package com.electro.dto.inventory;

import com.electro.dto.product.SupplierResponse;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
public class PurchaseOrderResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private SupplierResponse supplier;
    private Set<PurchaseOrderVariantResponse> purchaseOrderVariants;
    private DestinationResponse destination;
    private Double totalAmount;
    @Nullable
    private String note;
    private Integer status;
    private List<PurchaseOrderResponse.DocketResponse> dockets;

    @Data
    public static class DocketResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private Integer type;
        private String code;
        private PurchaseOrderResponse.DocketResponse.WarehouseResponse warehouse;
        private Integer status;

        @Data
        public static class WarehouseResponse {
            private Long id;
            private Instant createdAt;
            private Instant updatedAt;
            private String code;
            private String name;
            private Integer status;
        }
    }
}
