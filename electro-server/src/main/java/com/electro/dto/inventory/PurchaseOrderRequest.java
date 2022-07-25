package com.electro.dto.inventory;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class PurchaseOrderRequest {
    private String code;
    private Long supplierId;
    private Long destinationId;
    private Set<PurchaseOrderVariantRequest> purchaseOrderVariants;
    private Double totalAmount;
    private String note;
    private Integer status;
    private List<DocketRequest> dockets;
}
