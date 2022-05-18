package com.electro.dto.authentication;

import lombok.Data;

@Data
public class Role_UserRequest {
    Long id;
    String code;
    String name;
    Integer status;
}
