package com.electro.dto.waybill;

import com.electro.dto.order.OrderResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class WaybillResponse {
    private String  code;
    private Instant shippingDate;
    private Instant expectedDelivery;
    private String  note;
    private Integer status;
    private Integer paymentTypeId;
    private String  requiredNote;
    private Integer codAmount;
    private Integer weight;
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer serviceTypeId;
    private Integer serviceId;
    private OrderResponse order;
}
