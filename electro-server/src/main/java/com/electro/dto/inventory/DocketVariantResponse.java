package com.electro.dto.inventory;

import com.electro.dto.product.VariantResponse;
import lombok.Data;

@Data
public class DocketVariantResponse {
    private VariantResponse variant;
    private Integer quantity;
}
