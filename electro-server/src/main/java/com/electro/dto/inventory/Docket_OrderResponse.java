package com.electro.dto.inventory;

import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class Docket_OrderResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private Integer type;
    private String code;
    private DocketReasonResponse reason;
    private WarehouseResponse warehouse;
    private Set<DocketVariantResponse> docketVariants;
    private String note;
    private Integer status;

}