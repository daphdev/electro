package com.electro.service.promotion;

import com.electro.dto.promotion.PromotionRequest;
import com.electro.dto.promotion.PromotionResponse;
import com.electro.service.CrudService;

import java.time.Instant;

public interface PromotionService  extends CrudService<Long, PromotionRequest, PromotionResponse> {
    boolean checkProductHavePromotionEnable( Long productId, Instant startDate, Instant endDate);
}
