package com.electro.dto.order;

import lombok.Data;

import java.time.Instant;

@Data
public class OrderCancellationReasonResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String note;
    private Integer status;
}
