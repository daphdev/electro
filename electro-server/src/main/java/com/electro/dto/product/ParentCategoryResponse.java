package com.electro.dto.product;

import lombok.Data;

import java.time.Instant;

@Data
public class ParentCategoryResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private Integer status;
}
