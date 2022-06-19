package com.electro.dto.employee;

import lombok.Data;

import java.time.Instant;

@Data
public class JobTitleResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private Integer status;
}
