package com.electro.dto.inventory;

import lombok.Data;

import java.util.Set;

@Data
public class DocketRequest {
    private Integer type;
    private String code;
    private Long docketReasonId;
    private Long warehouseId;
    private Set<DocketVariantRequest> docketVariants;
    private Long purchaseOrderId;
    private Long orderId;
    private String note;
    private Integer status;

}
