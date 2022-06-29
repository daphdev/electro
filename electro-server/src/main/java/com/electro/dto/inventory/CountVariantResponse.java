package com.electro.dto.inventory;

import com.electro.dto.product.VariantResponse;
import lombok.Data;

@Data
public class CountVariantResponse {
    private VariantResponse variant;
    private Integer inventory;
    private Integer actualInventory;
}
