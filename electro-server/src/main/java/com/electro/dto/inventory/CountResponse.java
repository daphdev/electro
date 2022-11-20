package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

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
    @Nullable
    private String note;
    private Integer status;
}
