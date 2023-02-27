package com.electro.dto.client;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.util.List;

@Data
public class ClientWaybillResponse {
    private String waybillCode;
    private Instant waybillExpectedDeliveryTime;
    private List<ClientWaybillLogResponse> waybillLogs;

    @Data
    public static class ClientWaybillLogResponse {
        private Long waybillLogId;
        private Instant waybillLogCreatedAt;
        @Nullable
        private Integer waybillLogPreviousStatus;
        @Nullable
        private Integer waybillLogCurrentStatus;
    }
}
