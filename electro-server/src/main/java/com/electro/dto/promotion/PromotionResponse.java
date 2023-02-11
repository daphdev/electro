package com.electro.dto.promotion;

import lombok.Data;

import java.time.Instant;

@Data
public class PromotionResponse {
        private String name;
        private Instant startDate;
        private Instant endDate;
        private Integer percent;
        private Integer status;
}
