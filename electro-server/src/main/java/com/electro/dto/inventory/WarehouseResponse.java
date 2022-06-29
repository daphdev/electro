package com.electro.dto.inventory;

import com.electro.dto.address.AddressResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class WarehouseResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private String name;
    private AddressResponse address;
    private Integer status;
}
