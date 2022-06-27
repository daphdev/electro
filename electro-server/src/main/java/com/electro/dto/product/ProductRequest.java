package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ProductRequest {
    private String name;
    private String code;
    private String slug;
    private String shortDescription;
    private String description;
    private String thumbnail;
    private JsonNode images;
    private Integer status;
    private Long categoryId;
    private Long brandId;
    private Long supplierId;
    private Long unitId;
    private Set<Tag_ProductRequest> tags;
    private JsonNode specifications;
    private JsonNode properties;
    private List<VariantRequest> variants;
    private Double weight;
    private Long guaranteeId;
}
