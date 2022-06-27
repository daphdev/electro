package com.electro.mapper.product;

import com.electro.dto.product.ProductRequest;
import com.electro.dto.product.ProductResponse;
import com.electro.entity.product.Product;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface ProductMapper extends GenericMapper<Product, ProductRequest, ProductResponse> {

    @Override
    @BeanMapping(qualifiedByName = "attachProduct")
    @Mapping(source = "categoryId", target = "category", qualifiedByName = "mapCategoryIdToCategory")
    @Mapping(source = "brandId", target = "brand", qualifiedByName = "mapBrandIdToBrand")
    @Mapping(source = "supplierId", target = "supplier", qualifiedByName = "mapSupplierIdToSupplier")
    @Mapping(source = "unitId", target = "unit", qualifiedByName = "mapUnitIdToUnit")
    @Mapping(source = "guaranteeId", target = "guarantee", qualifiedByName = "mapGuaranteeIdToGuarantee")
    Product requestToEntity(ProductRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, qualifiedByName = "attachProduct")
    @Mapping(source = "categoryId", target = "category", qualifiedByName = "mapCategoryIdToCategory")
    @Mapping(source = "brandId", target = "brand", qualifiedByName = "mapBrandIdToBrand")
    @Mapping(source = "supplierId", target = "supplier", qualifiedByName = "mapSupplierIdToSupplier")
    @Mapping(source = "unitId", target = "unit", qualifiedByName = "mapUnitIdToUnit")
    @Mapping(source = "guaranteeId", target = "guarantee", qualifiedByName = "mapGuaranteeIdToGuarantee")
    Product partialUpdate(@MappingTarget Product entity, ProductRequest request);

}
