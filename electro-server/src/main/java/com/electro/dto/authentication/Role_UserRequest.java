package com.electro.dto.authentication;

import lombok.Data;

@Data
public class Role_UserRequest {
    private Long id;
    private String code;
    private String name;
    private Integer status;
}
