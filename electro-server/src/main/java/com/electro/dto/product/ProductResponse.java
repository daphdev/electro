package com.electro.dto.product;

import com.electro.dto.general.ImageResponse;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
public class ProductResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String code;
    private String slug;
    private String shortDescription;
    private String description;
    private List<ImageResponse> images;
    private Integer status;
    private Category_ProductResponse category;
    private BrandResponse brand;
    private SupplierResponse supplier;
    private UnitResponse unit;
    private Set<TagResponse> tags;
    private JsonNode specifications;
    private JsonNode properties;
    private List<VariantResponse> variants;
    private Double weight;
    private GuaranteeResponse guarantee;
}
