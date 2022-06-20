package com.electro.dto.product;

import lombok.Data;

import java.time.Instant;

@Data
public class ImageResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
}
