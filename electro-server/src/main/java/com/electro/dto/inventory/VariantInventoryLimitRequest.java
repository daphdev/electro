package com.electro.dto.inventory;

import lombok.Data;

@Data
public class VariantInventoryLimitRequest {
    private Long variantId;
    private Integer minimumLimit;
    private Integer maximumLimit;
}
