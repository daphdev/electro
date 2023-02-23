package com.electro.dto.waybill;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.util.List;

// Reference: https://api.ghn.vn/home/docs/detail?id=102
@Data
public class GhnCancelOrderResponse {
    @JsonAlias("code")
    private Integer code;
    @JsonAlias("message")
    private String message;
    @JsonAlias("data")
    private List<Data$> data;

    @Data
    public static class Data$ {
        @JsonAlias("order_code")
        private String orderCode;
        @JsonAlias("result")
        private Boolean result;
        @JsonAlias("message")
        private String message;
    }
}
