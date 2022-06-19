package com.electro.dto.employee;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

@Data
public class OfficeRequest {
    String name;
    AddressRequest address;
    Integer status;
}
