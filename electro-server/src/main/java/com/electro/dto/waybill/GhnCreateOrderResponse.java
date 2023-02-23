package com.electro.dto.waybill;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.time.Instant;

// Reference: https://api.ghn.vn/home/docs/detail?id=122
@Data
public class GhnCreateOrderResponse {
    @JsonAlias("code")
    private Integer code;
    @JsonAlias("code_message_value")
    private String codeMessageValue;
    @JsonAlias("data")
    private Data$ data;

    @Data
    public static class Data$ {
        @JsonAlias("order_code")
        private String orderCode;
        @JsonAlias("sort_code")
        private String sortCode;
        @JsonAlias("trans_type")
        private String transType;
        @JsonAlias("ward_encode")
        private String wardEncode;
        @JsonAlias("district_encode")
        private String districtEncode;
        @JsonAlias("fee")
        private Fee fee;

        @Data
        public static class Fee {
            @JsonAlias("main_service")
            private Integer mainService;
            @JsonAlias("insurance")
            private Integer insurance;
            @JsonAlias("cod_fee")
            private Integer codFee;
            @JsonAlias("station_do")
            private Integer stationDo;
            @JsonAlias("station_pu")
            private Integer stationPu;
            @JsonAlias("return")
            private Integer return$;
            @JsonAlias("r2s")
            private Integer r2s;
            @JsonAlias("coupon")
            private Integer coupon;
            @JsonAlias("document_return")
            private Integer documentReturn;
            @JsonAlias("double_check")
            private Integer doubleCheck;
            @JsonAlias("pick_remote_areas_fee")
            private Integer pickRemoteAreasFee;
            @JsonAlias("deliver_remote_areas_fee")
            private Integer deliverRemoteAreasFee;
            @JsonAlias("cod_failed_fee")
            private Integer codFailedFee;
        }

        @JsonAlias("total_fee")
        private Integer totalFee;
        @JsonAlias("expected_delivery_time")
        private Instant expectedDeliveryTime;
    }

    @JsonAlias("message")
    private String message;
    @JsonAlias("message_display")
    private String messageDisplay;
}
