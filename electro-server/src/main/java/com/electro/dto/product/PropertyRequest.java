package com.electro.dto.product;

import lombok.Data;

@Data
public class PropertyRequest {
    private String code;
    private String type;
    private String name;
    private String description;
    private Integer status;
}
