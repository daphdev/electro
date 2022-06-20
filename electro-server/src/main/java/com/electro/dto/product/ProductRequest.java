package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.util.Set;

@Data
public class ProductRequest {
    private String name;
    private String code;
    private String description;
    private String thumbnail;
    private Integer status;
    private JsonNode properties;
    private Long categoryId;
    private Long brandId;
    private Long unitId;
    private Long guaranteeId;
    private Long supplierId;
    private Set<ImageRequest> images;
}
