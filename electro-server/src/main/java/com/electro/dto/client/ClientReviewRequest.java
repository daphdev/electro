package com.electro.dto.client;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ClientReviewRequest {
    private Long userId;
    private Long productId;
    private Integer ratingScore;
    private String content;
    private Integer status;
}
