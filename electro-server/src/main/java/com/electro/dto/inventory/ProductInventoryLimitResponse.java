package com.electro.dto.inventory;

import com.electro.dto.product.ProductResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class ProductInventoryLimitResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private ProductResponse product;
    private Integer minimumLimit;
    private Integer maximumLimit;
}