package com.electro.mapper.employee;

import com.electro.dto.employee.EmployeeRequest;
import com.electro.dto.employee.EmployeeResponse;
import com.electro.entity.employee.Employee;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface EmployeeMapper extends GenericMapper<Employee, EmployeeRequest, EmployeeResponse> {

    @Override
    @BeanMapping(qualifiedByName = "attachEmployee")
    @Mapping(source = "user.address.provinceId", target = "user.address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "user.address.districtId", target = "user.address.district", qualifiedByName = "mapDistrictIdToDistrict")
    @Mapping(source = "user.password", target = "user.password", qualifiedByName = "hashPassword")
    @Mapping(source = "officeId", target = "office", qualifiedByName = "mapOfficeIdToOffice")
    @Mapping(source = "departmentId", target = "department", qualifiedByName = "mapDepartmentIdToDepartment")
    @Mapping(source = "jobTypeId", target = "jobType", qualifiedByName = "mapJobTypeIdToJobType")
    @Mapping(source = "jobLevelId", target = "jobLevel", qualifiedByName = "mapJobLevelIdToJobLevel")
    @Mapping(source = "jobTitleId", target = "jobTitle", qualifiedByName = "mapJobTitleIdToJobTitle")
    Employee requestToEntity(EmployeeRequest request);

    @Override
    @BeanMapping(qualifiedByName = "attachEmployee")
    @Mapping(source = "user.address.provinceId", target = "user.address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "user.address.districtId", target = "user.address.district", qualifiedByName = "mapDistrictIdToDistrict")
    @Mapping(source = "user.password", target = "user.password", qualifiedByName = "hashPassword",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "officeId", target = "office", qualifiedByName = "mapOfficeIdToOffice")
    @Mapping(source = "departmentId", target = "department", qualifiedByName = "mapDepartmentIdToDepartment")
    @Mapping(source = "jobTypeId", target = "jobType", qualifiedByName = "mapJobTypeIdToJobType")
    @Mapping(source = "jobLevelId", target = "jobLevel", qualifiedByName = "mapJobLevelIdToJobLevel")
    @Mapping(source = "jobTitleId", target = "jobTitle", qualifiedByName = "mapJobTitleIdToJobTitle")
    Employee partialUpdate(@MappingTarget Employee entity, EmployeeRequest request);

}
