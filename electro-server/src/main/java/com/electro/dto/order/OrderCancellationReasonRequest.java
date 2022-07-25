package com.electro.dto.order;

import lombok.Data;

@Data
public class OrderCancellationReasonRequest {
    private String name;
    private String note;
    private Integer status;
}
