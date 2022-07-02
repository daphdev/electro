package com.electro.dto.inventory;

import lombok.Data;

import java.time.Instant;

@Data
public class DocketReasonResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private Integer status;
}
