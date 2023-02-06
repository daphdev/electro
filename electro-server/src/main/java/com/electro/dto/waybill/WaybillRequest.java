package com.electro.dto.waybill;

import lombok.Data;

@Data
public class WaybillRequest {
    private Long    orderId;
    private String  note;
    private Integer paymentTypeId;
    private String  requiredNote;
    private Integer weight;
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer serviceTypeId;
    private Integer serviceId;
}
