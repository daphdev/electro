package com.electro.mapper;

import com.electro.entity.address.District;
import com.electro.entity.address.Province;
import com.electro.entity.employee.Department;
import com.electro.entity.employee.JobLevel;
import com.electro.entity.employee.JobTitle;
import com.electro.entity.employee.JobType;
import com.electro.entity.employee.Office;
import org.mapstruct.Named;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public interface CustomMapperMethods {

    @Named("mapProvinceIdToProvince")
    default Province mapProvinceIdToProvince(Long id) {
        return (Province) new Province().setId(id);
    }

    @Named("mapDistrictIdToDistrict")
    default District mapDistrictIdToDistrict(Long id) {
        return (District) new District().setId(id);
    }

    @Named("hashPassword")
    default String hashPassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }

    @Named("mapOfficeIdToOffice")
    default Office mapOfficeIdToOffice(Long id) {
        return (Office) new Office().setId(id);
    }

    @Named("mapDepartmentIdToDepartment")
    default Department mapDepartmentIdToDepartment(Long id) {
        return (Department) new Department().setId(id);
    }

    @Named("mapJobTypeIdToJobType")
    default JobType mapJobTypeIdToJobType(Long id) {
        return (JobType) new JobType().setId(id);
    }

    @Named("mapJobLevelIdToJobLevel")
    default JobLevel mapJobLevelIdToJobLevel(Long id) {
        return (JobLevel) new JobLevel().setId(id);
    }

    @Named("mapJobTitleIdToJobTitle")
    default JobTitle mapJobTitleIdToJobTitle(Long id) {
        return (JobTitle) new JobTitle().setId(id);
    }

}
