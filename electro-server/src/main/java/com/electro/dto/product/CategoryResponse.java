package com.electro.dto.product;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class CategoryResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private ParentCategoryResponse parentCategory;
    private Integer status;
    private List<CategoryResponse> categories;
}
