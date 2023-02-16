package com.electro.dto.waybill;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

// Reference: https://api.ghn.vn/home/docs/detail?id=102
@Data
@AllArgsConstructor
public class GhnCancelOrderRequest {
    @JsonProperty("order_codes")
    private List<String> orderCodes;
}
