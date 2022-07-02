package com.electro.dto.inventory;

import lombok.Data;

@Data
public class ProductInventoryLimitRequest {
    private Long productId;
    private Integer minimumLimit;
    private Integer maximumLimit;
}
