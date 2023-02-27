package com.electro.dto.waybill;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GhnCallbackOrderRequest {
    private BigDecimal codAmount; // Tiền thu hộ
    private String orderCode; // Mã vận đơn GHN // *
    private String description; // Mô tả từ phía GHN
    private String reason;
    private String reasonCode;
    private Integer shopID; // *
    private Integer width;
    private Integer weight;
    private String status; // *
}
