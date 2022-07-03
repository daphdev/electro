package com.electro.mapper.employee;

import com.electro.dto.employee.EmployeeRequest;
import com.electro.dto.employee.EmployeeResponse;
import com.electro.entity.employee.Employee;
import com.electro.mapper.GenericMapper;
import com.electro.mapper.authentication.UserMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {MapperUtils.class, UserMapper.class})
public interface EmployeeMapper extends GenericMapper<Employee, EmployeeRequest, EmployeeResponse> {

    @Override
    @Mapping(source = "officeId", target = "office")
    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "jobTypeId", target = "jobType")
    @Mapping(source = "jobLevelId", target = "jobLevel")
    @Mapping(source = "jobTitleId", target = "jobTitle")
    Employee requestToEntity(EmployeeRequest request);

    @Override
    @Mapping(source = "officeId", target = "office")
    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "jobTypeId", target = "jobType")
    @Mapping(source = "jobLevelId", target = "jobLevel")
    @Mapping(source = "jobTitleId", target = "jobTitle")
    Employee partialUpdate(@MappingTarget Employee entity, EmployeeRequest request);

}
