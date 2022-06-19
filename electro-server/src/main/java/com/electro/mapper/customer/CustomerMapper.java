package com.electro.mapper.customer;

import com.electro.dto.customer.CustomerRequest;
import com.electro.dto.customer.CustomerResponse;
import com.electro.entity.customer.Customer;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface CustomerMapper extends GenericMapper<Customer, CustomerRequest, CustomerResponse> {

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "user.address.provinceId", target = "user.address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "user.address.districtId", target = "user.address.district", qualifiedByName = "mapDistrictIdToDistrict")
    @Mapping(source = "user.password", target = "user.password", qualifiedByName = "hashPassword")
    @Mapping(source = "customerGroupId", target = "customerGroup", qualifiedByName = "mapCustomerGroupIdToCustomerGroup")
    @Mapping(source = "customerResourceId", target = "customerResource", qualifiedByName = "mapCustomerResourceIdToCustomerResource")
    @Mapping(source = "customerStatusId", target = "customerStatus", qualifiedByName = "mapCustomerStatusIdToCustomerStatus")
    Customer requestToEntity(CustomerRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "user.address.provinceId", target = "user.address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "user.address.districtId", target = "user.address.district", qualifiedByName = "mapDistrictIdToDistrict")
    @Mapping(source = "user.password", target = "user.password", qualifiedByName = "hashPassword")
    @Mapping(source = "customerGroupId", target = "customerGroup", qualifiedByName = "mapCustomerGroupIdToCustomerGroup")
    @Mapping(source = "customerResourceId", target = "customerResource", qualifiedByName = "mapCustomerResourceIdToCustomerResource")
    @Mapping(source = "customerStatusId", target = "customerStatus", qualifiedByName = "mapCustomerStatusIdToCustomerStatus")
    Customer partialUpdate(@MappingTarget Customer entity, CustomerRequest request);

}
