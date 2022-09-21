package com.electro.dto.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VariantRequest {
    private @Nullable Long id;
    private String sku;
    private Double cost;
    private Double price;
    private JsonNode properties;
    private JsonNode images;
    private Integer status;
}
