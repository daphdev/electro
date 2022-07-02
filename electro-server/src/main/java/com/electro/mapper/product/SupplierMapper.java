package com.electro.mapper.product;

import com.electro.dto.product.SupplierRequest;
import com.electro.dto.product.SupplierResponse;
import com.electro.entity.product.Supplier;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface SupplierMapper extends GenericMapper<Supplier, SupplierRequest, SupplierResponse> {

    @Override
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    Supplier requestToEntity(SupplierRequest request);

    @Override
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    Supplier partialUpdate(@MappingTarget Supplier entity, SupplierRequest request);

}
