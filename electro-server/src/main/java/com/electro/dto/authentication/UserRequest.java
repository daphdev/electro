package com.electro.dto.authentication;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

import java.util.Set;

@Data
public class UserRequest {
    String username;
    String password;
    String fullname;
    String email;
    String phone;
    String gender;
    AddressRequest address;
    String avatar;
    Integer status;
    Set<Role_UserRequest> roles;
}
