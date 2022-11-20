package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.util.Set;

@Data
public class DocketRequest {
    private Integer type;
    private String code;
    private Long reasonId;
    private Long warehouseId;
    private Set<DocketVariantRequest> docketVariants;
    @Nullable
    private Long purchaseOrderId;
    @Nullable
    private Long orderId;
    @Nullable
    private String note;
    private Integer status;
}
