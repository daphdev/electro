package com.electro.mapper.product;

import com.electro.dto.product.SpecificationRequest;
import com.electro.dto.product.SpecificationResponse;
import com.electro.entity.product.Specification;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SpecificationMapper extends GenericMapper<Specification, SpecificationRequest, SpecificationResponse> {
}
