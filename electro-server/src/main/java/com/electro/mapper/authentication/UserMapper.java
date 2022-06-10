package com.electro.mapper.authentication;

import com.electro.dto.authentication.UserRequest;
import com.electro.dto.authentication.UserResponse;
import com.electro.entity.authentication.User;
import com.electro.mapper.CustomMapperMethods;
import com.electro.mapper.GenericMapper;
import com.electro.utils.AttachUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = AttachUtils.class)
public interface UserMapper extends GenericMapper<User, UserRequest, UserResponse>, CustomMapperMethods {

    @Override
    @BeanMapping(qualifiedByName = "attachUser")
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    User requestToEntity(UserRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, qualifiedByName = "attachUser")
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    User partialUpdate(@MappingTarget User entity, UserRequest request);

}
