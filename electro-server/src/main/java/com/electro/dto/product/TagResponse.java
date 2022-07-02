package com.electro.dto.product;

import lombok.Data;

import java.time.Instant;

@Data
public class TagResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String slug;
    private Integer status;
}
