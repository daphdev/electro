package com.electro.dto.client;

import lombok.Data;

import java.util.List;

@Data
public class ClientRewardResponse {
    private Integer rewardTotalScore;
    private List<ClientRewardLogResponse> rewardLogs;
}
