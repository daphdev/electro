package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.Instant;

@Data
public class VariantResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String sku;
    private Double cost;
    private Double price;
    private JsonNode properties;
    private JsonNode images;
    private Integer status;
}
