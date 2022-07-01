package com.electro.dto.inventory;

import com.electro.dto.address.AddressResponse;
import lombok.Data;

@Data
public class DestinationResponse {
    private String contactFullName;
    private String contactEmail;
    private AddressResponse address;
    private Integer status;
}
