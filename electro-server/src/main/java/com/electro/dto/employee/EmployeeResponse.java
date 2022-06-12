package com.electro.dto.employee;

import com.electro.dto.authentication.UserResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class EmployeeResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    UserResponse user;
    OfficeResponse office;
    DepartmentResponse department;
    JobTypeResponse jobType;
    JobLevelResponse jobLevel;
    JobTitleResponse jobTitle;
}
