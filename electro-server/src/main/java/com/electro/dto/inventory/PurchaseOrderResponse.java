package com.electro.dto.inventory;

import com.electro.dto.product.SupplierResponse;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class PurchaseOrderResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private SupplierResponse supplier;
    private DestinationResponse destination;
    private Set<PurchaseOrderVariantResponse> purchaseOrderVariants;
    private Double totalAmount;
    private String note;
    private Integer status;

}
