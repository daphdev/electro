package com.electro.mapper.inventory;

import com.electro.dto.inventory.StorageLocationRequest;
import com.electro.dto.inventory.StorageLocationResponse;
import com.electro.entity.inventory.StorageLocation;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface StorageLocationMapper extends GenericMapper<StorageLocation, StorageLocationRequest, StorageLocationResponse> {

    @Override
    @Mapping(source = "variantId", target = "variant")
    @Mapping(source = "warehouseId", target = "warehouse")
    StorageLocation requestToEntity(StorageLocationRequest request);

    @Override
    @Mapping(source = "variantId", target = "variant")
    @Mapping(source = "warehouseId", target = "warehouse")
    StorageLocation partialUpdate(@MappingTarget StorageLocation entity, StorageLocationRequest request);
}
