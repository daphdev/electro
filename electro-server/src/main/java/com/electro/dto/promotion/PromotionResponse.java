package com.electro.dto.promotion;

import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class PromotionResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private Instant startDate;
    private Instant endDate;
    private Integer percent;
    private Integer status;
    private Set<ProductResponse> products;

    @Data
    public static class ProductResponse {
        private Long id;
        private Instant createdAt;
        private Instant updatedAt;
        private String name;
        private String code;
        private String slug;
    }
}
