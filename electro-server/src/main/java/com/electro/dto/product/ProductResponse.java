package com.electro.dto.product;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ProductResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String code;
    private String description;
    private String thumbnail;
    private List<ImageResponse> images;
    private Integer status;
    private CategoryResponse category;
    private BrandResponse brand;
    private SupplierResponse supplier;
    private UnitResponse unit;
    private JsonNode properties;
    private GuaranteeResponse guarantee;
}
