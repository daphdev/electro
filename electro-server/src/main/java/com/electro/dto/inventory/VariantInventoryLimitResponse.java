package com.electro.dto.inventory;

import com.electro.dto.product.VariantResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class VariantInventoryLimitResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private VariantResponse variant;
    private Integer minimumLimit;
    private Integer maximumLimit;
}
