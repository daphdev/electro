package com.electro.mapper.inventory;

import com.electro.dto.inventory.StorageLocationRequest;
import com.electro.dto.inventory.StorageLocationResponse;
import com.electro.entity.inventory.StorageLocation;
import com.electro.mapper.GenericMapper;
import com.electro.mapper.product.VariantMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {MapperUtils.class, WarehouseMapper.class, VariantMapper.class})
public interface StorageLocationMapper extends GenericMapper<StorageLocation, StorageLocationRequest, StorageLocationResponse> {

    @Override
    @Mapping(source = "warehouseId", target = "warehouse")
    @Mapping(source = "variantId", target = "variant")
    StorageLocation requestToEntity(StorageLocationRequest request);

    @Override
    @Mapping(source = "warehouseId", target = "warehouse")
    @Mapping(source = "variantId", target = "variant")
    StorageLocation partialUpdate(@MappingTarget StorageLocation entity, StorageLocationRequest request);

}
