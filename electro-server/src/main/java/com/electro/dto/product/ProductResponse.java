package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class ProductResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String code;
    private String description;
    private String thumbnail;
    private Integer status;
    private JsonNode properties;
    private CategoryResponse category;
    private BrandResponse brand;
    private UnitResponse unit;
    private GuaranteeResponse guarantee;
    private SupplierResponse supplier;
    private Set<ImageResponse> images;
}
