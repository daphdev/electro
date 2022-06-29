package com.electro.mapper.inventory;

import com.electro.dto.inventory.WarehouseRequest;
import com.electro.dto.inventory.WarehouseResponse;
import com.electro.entity.inventory.Warehouse;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface WarehouseMapper extends GenericMapper<Warehouse, WarehouseRequest, WarehouseResponse> {

    @Override
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    Warehouse requestToEntity(WarehouseRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    Warehouse partialUpdate(@MappingTarget Warehouse entity, WarehouseRequest request);
}
