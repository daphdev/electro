package com.electro.dto.waybill;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GhnCancelOrder {
    @JsonProperty("order_codes")
    private List<String> orderCodes;
}
