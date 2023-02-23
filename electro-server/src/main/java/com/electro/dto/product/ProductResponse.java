package com.electro.dto.product;

import com.electro.dto.general.ImageResponse;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

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
    @Nullable
    private String shortDescription;
    @Nullable
    private String description;
    private List<ImageResponse> images;
    private Integer status;
    @Nullable
    private ProductResponse.CategoryResponse category;
    @Nullable
    private BrandResponse brand;
    @Nullable
    private SupplierResponse supplier;
    @Nullable
    private UnitResponse unit;
    private Set<TagResponse> tags;
    @Nullable
    private JsonNode specifications;
    @Nullable
    private JsonNode properties;
    private List<ProductResponse.VariantResponse> variants;
    @Nullable
    private Double weight;
    @Nullable
    private GuaranteeResponse guarantee;

    @Data
    public static class CategoryResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private String name;
        private String slug;
        @Nullable
        private String description;
        @Nullable
        private String thumbnail;
        private Integer status;
    }

    @Data
    public static class VariantResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private String sku;
        private Double cost;
        private Double price;
        @Nullable
        private JsonNode properties;
        private Integer status;
    }
}
