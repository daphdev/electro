package com.electro.mapper.address;

import com.electro.dto.address.AddressRequest;
import com.electro.dto.address.AddressResponse;
import com.electro.entity.address.Address;
import com.electro.mapper.CustomMapperMethods;
import com.electro.mapper.GenericMapper;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AddressMapper extends GenericMapper<Address, AddressRequest, AddressResponse>, CustomMapperMethods {

    @Override
    @Mapping(source = "provinceId", target = "province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "districtId", target = "district", qualifiedByName = "mapDistrictIdToDistrict")
    Address requestToEntity(AddressRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "provinceId", target = "province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "districtId", target = "district", qualifiedByName = "mapDistrictIdToDistrict")
    Address partialUpdate(@MappingTarget Address entity, AddressRequest request);

}
