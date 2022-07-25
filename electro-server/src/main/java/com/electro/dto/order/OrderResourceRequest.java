package com.electro.dto.order;

import lombok.Data;

@Data
public class OrderResourceRequest {
    private String code;
    private String name;
    private String color;
    private Long customerResourceId;
    private Integer status;
}
