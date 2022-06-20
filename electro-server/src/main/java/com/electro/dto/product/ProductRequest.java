package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String code;
    private String description;
    private String thumbnail;
    private Integer status;
    private JsonNode properties;
}
