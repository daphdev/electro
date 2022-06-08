package com.electro.dto.product;

import lombok.Data;

@Data
public class BrandRequest {
    String name;
    String code;
    String description;
    Integer status;
}
