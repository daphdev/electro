package com.electro.dto.product;

import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
public class CategoryResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String description;
    private String thumbnail;
    private Integer status;
    private ParentCategoryResponse parentCategory;
    private List<CategoryResponse> categories;
    private Set<PropertyRequest> properties;
}
