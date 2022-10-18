package com.electro.mapper.inventory;

import com.electro.dto.inventory.VariantInventoryLimitRequest;
import com.electro.dto.inventory.VariantInventoryLimitResponse;
import com.electro.entity.inventory.VariantInventoryLimit;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface VariantInventoryLimitMapper extends GenericMapper<VariantInventoryLimit, VariantInventoryLimitRequest,
        VariantInventoryLimitResponse> {

    @Override
    @Mapping(source = "variantId", target = "variant")
    VariantInventoryLimit requestToEntity(VariantInventoryLimitRequest request);

    @Override
    @Mapping(source = "variantId", target = "variant")
    VariantInventoryLimit partialUpdate(@MappingTarget VariantInventoryLimit entity, VariantInventoryLimitRequest request);

}
