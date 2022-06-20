package com.electro.mapper.product;

import com.electro.dto.product.PropertyRequest;
import com.electro.dto.product.PropertyResponse;
import com.electro.entity.product.Property;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PropertyMapper extends GenericMapper<Property, PropertyRequest, PropertyResponse> {
}
