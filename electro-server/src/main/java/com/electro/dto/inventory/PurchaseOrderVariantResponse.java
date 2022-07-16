package com.electro.dto.inventory;

import com.electro.dto.product.VariantResponse;
import lombok.Data;

@Data
public class PurchaseOrderVariantResponse {
    private VariantResponse variant;
    private Double cost;
    private Integer quantity;
    private Double amount;

}
