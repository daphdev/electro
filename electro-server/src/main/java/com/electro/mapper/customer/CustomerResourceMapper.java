package com.electro.mapper.customer;

import com.electro.dto.customer.CustomerResourceRequest;
import com.electro.dto.customer.CustomerResourceResponse;
import com.electro.entity.customer.CustomerResource;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CustomerResourceMapper extends GenericMapper<CustomerResource, CustomerResourceRequest, CustomerResourceResponse> {
}
