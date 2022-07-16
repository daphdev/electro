package com.electro.dto.inventory;

import lombok.Data;

@Data
public class StorageLocationRequest {
    private Long variantId;
    private Long warehouseId;
    private String name;
}
