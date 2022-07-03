package com.electro.mapper.inventory;

import com.electro.dto.inventory.TransferVariantRequest;
import com.electro.dto.inventory.TransferVariantResponse;
import com.electro.entity.inventory.TransferVariant;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface TransferVariantMapper extends GenericMapper<TransferVariant, TransferVariantRequest, TransferVariantResponse> {

    @Override
    @Mapping(source = "variantId", target = "variant")
    TransferVariant requestToEntity(TransferVariantRequest request);

    @Override
    @Mapping(source = "variantId", target = "variant")
    TransferVariant partialUpdate(@MappingTarget TransferVariant entity, TransferVariantRequest request);

}
