package com.electro.dto.inventory;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

@Data
public class DestinationRequest {
    private String contactFullName;
    private String contactEmail;
    private String contactPhone;
    private AddressRequest address;
    private Integer status;
}
