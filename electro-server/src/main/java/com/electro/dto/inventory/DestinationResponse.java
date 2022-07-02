package com.electro.dto.inventory;

import com.electro.dto.address.AddressResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class DestinationResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String contactFullname;
    private String contactEmail;
    private String contactPhone;
    private AddressResponse address;
    private Integer status;
}
