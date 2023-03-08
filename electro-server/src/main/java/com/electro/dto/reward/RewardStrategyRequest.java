package com.electro.dto.reward;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class RewardStrategyRequest {
    @Nullable
    private String formula;
    @Nullable
    private Integer status;
}
