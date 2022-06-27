package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class VariantRequest {
    private String sku;
    private Double cost;
    private Double price;
    private JsonNode properties;
    private JsonNode images;
    private Integer status;
}
