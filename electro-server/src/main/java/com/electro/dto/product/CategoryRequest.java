package com.electro.dto.product;

import lombok.Data;

import java.util.Set;

@Data
public class CategoryRequest {
    private String name;
    private String description;
    private String thumbnail;
    private Integer status;
    private Long parentCategoryId;
    private Set<PropertyRequest> properties;
}
