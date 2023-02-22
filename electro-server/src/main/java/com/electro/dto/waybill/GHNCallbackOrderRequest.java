package com.electro.dto.waybill;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GHNCallbackOrderRequest {
    private BigDecimal codAmount; // Tiền thu hộ.
    private String orderCode; // Mã vận đơn ghn
    private String Description; // mô tả từ phía ghn
    private String reason;
    private String reasonCode;
    private Integer shopID;
    private Integer width;
    private Integer weight;
    private String status;
}
