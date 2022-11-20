package com.electro.dto.inventory;

import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;

@Data
public class TransferResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private DocketResponse exportDocket;
    private DocketResponse importDocket;
    @Nullable
    private String note;
}
