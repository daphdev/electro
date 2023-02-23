package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.util.Set;

@Data
public class CountRequest {
    private String code;
    private Long warehouseId;
    private Set<CountVariantRequest> countVariants;
    @Nullable
    private String note;
    private Integer status;
}
