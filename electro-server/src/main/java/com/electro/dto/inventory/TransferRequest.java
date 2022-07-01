package com.electro.dto.inventory;

import lombok.Data;

import java.util.Set;

@Data
public class TransferRequest {
    private String code;
    private Set<TransferVariantRequest> transferVariants;
    private String note;
    private Integer status;

}
