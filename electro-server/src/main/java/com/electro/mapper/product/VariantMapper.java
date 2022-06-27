package com.electro.mapper.product;

import com.electro.dto.product.VariantRequest;
import com.electro.dto.product.VariantResponse;
import com.electro.entity.product.Variant;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VariantMapper extends GenericMapper<Variant, VariantRequest, VariantResponse> {
}
