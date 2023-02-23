package com.electro.dto.client;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

@Data
public class ClientPersonalSettingUserRequest {
    private String username;
    private String fullname;
    private String gender;
    private AddressRequest address;
}
