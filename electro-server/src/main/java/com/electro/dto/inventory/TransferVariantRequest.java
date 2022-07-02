package com.electro.dto.inventory;

import lombok.Data;

@Data
public class TransferVariantRequest {
    private Long variantId;
    private Integer quantity;
}
