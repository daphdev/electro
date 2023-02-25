package com.electro.controller.promotion;

import com.electro.constant.AppConstants;
import com.electro.dto.promotion.PromotionCheckingResponse;
import com.electro.service.promotion.PromotionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/promotions")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
public class PromotionController {

    private PromotionService promotionService;

    @GetMapping("/checking")
    public ResponseEntity<PromotionCheckingResponse> checkCanCreatePromotionForProduct(
            @RequestParam Long productId,
            @RequestParam Instant startDate,
            @RequestParam Instant endDate
    ) {
        boolean promotionable = promotionService.checkCanCreatePromotionForProduct(productId, startDate, endDate);
        return ResponseEntity.status(HttpStatus.OK).body(new PromotionCheckingResponse(promotionable));
    }

}
