package com.electro.mapper.customer;

import com.electro.dto.customer.CustomerGroupRequest;
import com.electro.dto.customer.CustomerGroupResponse;
import com.electro.entity.customer.CustomerGroup;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CustomerGroupMapper extends GenericMapper<CustomerGroup, CustomerGroupRequest, CustomerGroupResponse> {
}
