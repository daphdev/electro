package com.electro.dto.inventory;

import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class CountResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private WarehouseResponse warehouse;
    private Set<CountVariantResponse> countVariants;
    private String note;
    private Integer status;
}
