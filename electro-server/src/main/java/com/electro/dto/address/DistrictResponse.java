package com.electro.dto.address;

import lombok.Data;

import java.time.Instant;

@Data
public class DistrictResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String name;
    String code;
    ProvinceResponse province;
}
