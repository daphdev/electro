package com.electro.dto.address;

import lombok.Data;

import java.time.Instant;

@Data
public class WardResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String code;
    private DistrictResponse district;
}
