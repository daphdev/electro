package com.electro.dto.employee;

import com.electro.dto.authentication.UserRequest;
import lombok.Data;

@Data
public class EmployeeRequest {
    UserRequest user;
    Long officeId;
    Long departmentId;
    Long jobTypeId;
    Long jobLevelId;
    Long jobTitleId;
}
