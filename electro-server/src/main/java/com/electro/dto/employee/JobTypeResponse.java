package com.electro.dto.employee;

import lombok.Data;

import java.time.Instant;

@Data
public class JobTypeResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String name;
    Integer status;
}
