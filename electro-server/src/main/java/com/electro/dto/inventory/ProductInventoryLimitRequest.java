package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class ProductInventoryLimitRequest {
    private Long productId;
    @Nullable
    private Integer minimumLimit;
    @Nullable
    private Integer maximumLimit;
}
