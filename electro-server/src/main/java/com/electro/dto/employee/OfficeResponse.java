package com.electro.dto.employee;

import com.electro.dto.address.AddressResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class OfficeResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String name;
    AddressResponse address;
    Integer status;
}
