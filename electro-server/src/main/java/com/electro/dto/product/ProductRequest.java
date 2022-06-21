package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private String code;
    private String description;
    private String thumbnail;
    private List<ImageRequest> images;
    private Integer status;
    private Long categoryId;
    private Long brandId;
    private Long supplierId;
    private Long unitId;
    private JsonNode properties;
    private Long guaranteeId;
}
