package com.electro.dto.waybill;

import com.electro.entity.waybill.RequiredNote;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class WaybillRequest {
    private Long orderId;
    @Nullable
    private String note;
    private Integer paymentTypeId;
    private RequiredNote requiredNote;
    private Integer weight;
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer serviceTypeId;
    private Integer serviceId;
}
