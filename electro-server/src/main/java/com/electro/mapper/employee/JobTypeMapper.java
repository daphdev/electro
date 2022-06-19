package com.electro.mapper.employee;

import com.electro.dto.employee.JobTypeRequest;
import com.electro.dto.employee.JobTypeResponse;
import com.electro.entity.employee.JobType;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface JobTypeMapper extends GenericMapper<JobType, JobTypeRequest, JobTypeResponse> {
}
