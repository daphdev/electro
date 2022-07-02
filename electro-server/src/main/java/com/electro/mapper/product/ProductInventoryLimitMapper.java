package com.electro.mapper.product;

import com.electro.dto.product.ProductInventoryLimitRequest;
import com.electro.dto.product.ProductInventoryLimitResponse;
import com.electro.entity.product.ProductInventoryLimit;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface ProductInventoryLimitMapper extends GenericMapper<ProductInventoryLimit, ProductInventoryLimitRequest, ProductInventoryLimitResponse> {

    @Override
    @Mapping(source = "productId", target = "product", qualifiedByName = "mapProductIdToProduct")
    ProductInventoryLimit requestToEntity(ProductInventoryLimitRequest request);

    @Override
    @Mapping(source = "productId", target = "product", qualifiedByName = "mapProductIdToProduct")
    ProductInventoryLimit partialUpdate(@MappingTarget ProductInventoryLimit entity, ProductInventoryLimitRequest request);

}
