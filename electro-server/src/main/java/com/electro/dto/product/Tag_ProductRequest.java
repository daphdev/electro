package com.electro.dto.product;

import lombok.Data;

@Data
public class Tag_ProductRequest {
    private Long id;
    private String name;
    private String slug;
    private Integer status;
}
