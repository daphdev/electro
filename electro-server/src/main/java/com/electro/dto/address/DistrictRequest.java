package com.electro.dto.address;

import lombok.Data;

@Data
public class DistrictRequest {
    String name;
    String code;
    Long provinceId;
}
