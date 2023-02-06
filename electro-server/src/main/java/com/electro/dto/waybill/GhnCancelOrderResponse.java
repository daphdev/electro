package com.electro.dto.waybill;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.util.List;

@Data
public class GhnCancelOrderResponse {

    @JsonAlias("code")
    private Integer code;

    @JsonAlias("message")
    private String message;

    @JsonAlias("data")
    private List<DataProp> data;

    @Data
    public static class DataProp {
        @JsonAlias("order_code")
        private String orderCode;

        @JsonAlias("result")
        private Boolean result;

        @JsonAlias("message")
        private String message;
    }
}
