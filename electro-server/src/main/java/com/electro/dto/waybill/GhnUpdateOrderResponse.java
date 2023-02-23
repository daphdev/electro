package com.electro.dto.waybill;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

// Reference: https://api.ghn.vn/home/docs/detail?id=103
@Data
public class GhnUpdateOrderResponse {
    @JsonAlias("code")
    private Integer code;
    @JsonAlias("message")
    private String message;
}
