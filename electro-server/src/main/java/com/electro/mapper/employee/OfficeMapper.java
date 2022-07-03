package com.electro.mapper.employee;

import com.electro.dto.employee.OfficeRequest;
import com.electro.dto.employee.OfficeResponse;
import com.electro.entity.employee.Office;
import com.electro.mapper.GenericMapper;
import com.electro.mapper.address.AddressMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = AddressMapper.class)
public interface OfficeMapper extends GenericMapper<Office, OfficeRequest, OfficeResponse> {
}
