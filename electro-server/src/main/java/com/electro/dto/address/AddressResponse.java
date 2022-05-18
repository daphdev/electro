package com.electro.dto.address;

import lombok.Data;

import java.time.Instant;

@Data
public class AddressResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String line;
    ProvinceResponse province;
    District_AddressResponse district;
}
