package com.electro.dto.authentication;

import lombok.Data;

@Data
public class RoleRequest {
    String code;
    String name;
    Integer status;
}
