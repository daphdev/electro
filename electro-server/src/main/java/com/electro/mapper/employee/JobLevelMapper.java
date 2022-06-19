package com.electro.mapper.employee;

import com.electro.dto.employee.JobLevelRequest;
import com.electro.dto.employee.JobLevelResponse;
import com.electro.entity.employee.JobLevel;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface JobLevelMapper extends GenericMapper<JobLevel, JobLevelRequest, JobLevelResponse> {
}
