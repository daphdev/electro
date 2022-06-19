package com.electro.dto.address;

import lombok.Data;

import java.time.Instant;

@Data
public class AddressResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String line;
    private ProvinceResponse province;
    private District_AddressResponse district;
}
