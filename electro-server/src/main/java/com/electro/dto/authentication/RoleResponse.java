package com.electro.dto.authentication;

import lombok.Data;

import java.time.Instant;

@Data
public class RoleResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String code;
    String name;
    Integer status;
}
