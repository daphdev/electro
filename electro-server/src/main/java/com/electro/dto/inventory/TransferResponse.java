package com.electro.dto.inventory;

import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class TransferResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private Set<TransferVariantResponse> transferVariants;
    private String note;
    private Integer status;
}
