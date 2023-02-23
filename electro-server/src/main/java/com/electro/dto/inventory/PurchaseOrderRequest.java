package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.util.Set;

@Data
public class PurchaseOrderRequest {
    private String code;
    private Long supplierId;
    private Set<PurchaseOrderVariantRequest> purchaseOrderVariants;
    private Long destinationId;
    private Double totalAmount;
    @Nullable
    private String note;
    private Integer status;
}
