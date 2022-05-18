package com.electro.dto.address;

import lombok.Data;

@Data
public class AddressRequest {
    String line;
    Long provinceId;
    Long districtId;
}
