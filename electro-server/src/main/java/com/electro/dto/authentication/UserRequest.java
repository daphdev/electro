package com.electro.dto.authentication;

import com.electro.dto.address.AddressRequest;
import lombok.Data;

import java.util.Set;

@Data
public class UserRequest {
    private String username;
    private String password;
    private String fullname;
    private String email;
    private String phone;
    private String gender;
    private AddressRequest address;
    private String avatar;
    private Integer status;
    private Set<Role_UserRequest> roles;
}
