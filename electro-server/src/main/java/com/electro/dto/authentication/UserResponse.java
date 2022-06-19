package com.electro.dto.authentication;

import com.electro.dto.address.AddressResponse;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class UserResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String username;
    String fullname;
    String email;
    String phone;
    String gender;
    AddressResponse address;
    String avatar;
    Integer status;
    Set<RoleResponse> roles;
}
