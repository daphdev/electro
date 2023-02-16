package com.electro.dto.waybill;

import com.electro.dto.order.OrderResponse;
import com.electro.entity.waybill.RequiredNote;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;

@Data
public class WaybillResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private OrderResponse order;
    private Instant shippingDate;
    @Nullable
    private Instant expectedDelivery;
    @Nullable
    private String note;
    private Integer status;
    private Integer paymentTypeId;
    private RequiredNote requiredNote;
    private Integer codAmount;
    private Integer weight;
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer serviceTypeId;
    private Integer serviceId;
}
