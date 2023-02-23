package com.electro.dto.waybill;

import com.electro.entity.waybill.RequiredNote;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.util.List;

// Reference: https://api.ghn.vn/home/docs/detail?id=122
@Data
public class GhnCreateOrderRequest {
    @JsonProperty("payment_type_id")
    private Integer paymentTypeId;
    @JsonProperty("note")
    @Nullable
    private String note;
    @JsonProperty("required_note")
    private RequiredNote requiredNote;
    @JsonProperty("to_name")
    private String toName;
    @JsonProperty("to_phone")
    private String toPhone;
    @JsonProperty("to_address")
    private String toAddress;
    @JsonProperty("to_ward_name")
    private String toWardName;
    @JsonProperty("to_district_name")
    private String toDistrictName;
    @JsonProperty("to_province_name")
    private String toProvinceName;
    @JsonProperty("cod_amount")
    @Nullable
    private Integer codAmount;
    @JsonProperty("weight")
    private Integer weight;
    @JsonProperty("length")
    private Integer length;
    @JsonProperty("width")
    private Integer width;
    @JsonProperty("height")
    private Integer height;
    @JsonProperty("service_type_id")
    private Integer serviceTypeId;
    @JsonProperty("service_id")
    private Integer serviceId;
    @JsonProperty("pickup_time")
    private Long pickupTime;
    @JsonProperty("items")
    private List<Item> items;

    @Data
    public static class Item {
        @JsonProperty("name")
        private String name;
        @JsonProperty("quantity")
        private Integer quantity;
        @JsonProperty("price")
        @Nullable
        private Integer price;
    }
}
