package com.electro.dto.employee;

import com.electro.dto.authentication.UserResponse;
import lombok.Data;

@Data
public class EmployeeResponse {
    Long id;
    UserResponse user;
    OfficeResponse office;
    DepartmentResponse department;
    JobTypeResponse jobType;
    JobLevelResponse jobLevel;
    JobTitleResponse jobTitle;
}
