package com.electro.dto.employee;

import com.electro.dto.authentication.UserRequest;
import lombok.Data;

@Data
public class EmployeeRequest {
    private UserRequest user;
    private Long officeId;
    private Long departmentId;
    private Long jobTypeId;
    private Long jobLevelId;
    private Long jobTitleId;
}
