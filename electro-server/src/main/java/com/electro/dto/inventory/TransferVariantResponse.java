package com.electro.dto.inventory;

import com.electro.dto.product.VariantResponse;
import lombok.Data;

@Data
public class TransferVariantResponse {
    private VariantResponse variant;
    private Integer quantity;
}
