package com.electro.dto.employee;

import lombok.Data;

import java.time.Instant;

@Data
public class JobLevelResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    String name;
    Integer status;
}
