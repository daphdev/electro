package com.electro.dto.promotion;

import com.electro.utils.DefaultInstantDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class PromotionRequest {
    private String name;
    @JsonDeserialize(using = DefaultInstantDeserializer.class)
    private Instant startDate;
    @JsonDeserialize(using = DefaultInstantDeserializer.class)
    private Instant endDate;
    private Integer percent;
    private Integer status;
    private Set<Long> productIds;
    private Set<Long> categoryIds;
}
