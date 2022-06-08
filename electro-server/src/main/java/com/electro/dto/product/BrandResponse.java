package com.electro.dto.product;

import lombok.Data;

import java.time.Instant;

@Data
public class BrandResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String name;
    String code;
    String description;
    Integer status;
}
