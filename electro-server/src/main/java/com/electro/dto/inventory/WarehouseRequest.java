package com.electro.dto.inventory;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

@Data
public class WarehouseRequest {
    private String code;
    private String name;
    private AddressRequest address;
    private Integer status;
}
