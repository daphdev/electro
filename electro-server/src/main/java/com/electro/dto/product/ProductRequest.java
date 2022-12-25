package com.electro.dto.product;

import com.electro.dto.general.ImageRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Set;

@Data
public class ProductRequest {
    private String name;
    private String code;
    private String slug;
    @Nullable
    private String shortDescription;
    @Nullable
    private String description;
    private List<ImageRequest> images;
    private Integer status;
    @Nullable
    private Long categoryId;
    @Nullable
    private Long brandId;
    @Nullable
    private Long supplierId;
    @Nullable
    private Long unitId;
    private Set<ProductRequest.TagRequest> tags;
    @Nullable
    private JsonNode specifications;
    @Nullable
    private JsonNode properties;
    private List<VariantRequest> variants;
    @Nullable
    private Double weight;
    @Nullable
    private Long guaranteeId;

    @Data
    public static class TagRequest {
        private Long id;
        private String name;
        private String slug;
        private Integer status;
    }
}
