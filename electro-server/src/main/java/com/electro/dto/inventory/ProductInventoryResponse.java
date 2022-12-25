package com.electro.dto.inventory;

import com.electro.dto.product.BrandResponse;
import com.electro.dto.product.SupplierResponse;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.util.List;

@Data
public class ProductInventoryResponse {
    private ProductInventoryResponse.ProductResponse product;
    private List<DocketVariantExtendedResponse> transactions;
    private Integer inventory;
    private Integer waitingForDelivery;
    private Integer canBeSold;
    private Integer areComing;

    @Data
    public static class ProductResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private String name;
        private String code;
        private String slug;
        @Nullable
        private BrandResponse brand;
        @Nullable
        private SupplierResponse supplier;
    }
}
