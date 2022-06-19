package com.electro.dto.employee;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

@Data
public class OfficeRequest {
    private String name;
    private AddressRequest address;
    private Integer status;
}
