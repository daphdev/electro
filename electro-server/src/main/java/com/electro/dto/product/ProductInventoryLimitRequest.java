package com.electro.dto.product;

import lombok.Data;

@Data
public class ProductInventoryLimitRequest {
    private Long productId;
    private Integer minimumLimit;
    private Integer maximumLimit;
}
