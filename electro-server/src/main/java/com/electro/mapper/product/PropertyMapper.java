package com.electro.mapper.product;

import com.electro.dto.product.PropertyRequest;
import com.electro.dto.product.PropertyResponse;
import com.electro.entity.product.Property;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface PropertyMapper extends GenericMapper<Property, PropertyRequest, PropertyResponse> {
}
