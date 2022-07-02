package com.electro.mapper.inventory;

import com.electro.dto.inventory.DestinationRequest;
import com.electro.dto.inventory.DestinationResponse;
import com.electro.entity.inventory.Destination;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface DestinationMapper extends GenericMapper<Destination, DestinationRequest, DestinationResponse> {

    @Override
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    Destination requestToEntity(DestinationRequest request);

    @Override
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    Destination partialUpdate(@MappingTarget Destination entity, DestinationRequest request);

}
