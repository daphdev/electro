package com.electro.mapper.inventory;

import com.electro.dto.inventory.ProductInventoryLimitRequest;
import com.electro.dto.inventory.ProductInventoryLimitResponse;
import com.electro.entity.inventory.ProductInventoryLimit;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface ProductInventoryLimitMapper extends GenericMapper<ProductInventoryLimit, ProductInventoryLimitRequest,
        ProductInventoryLimitResponse> {

    @Override
    @Mapping(source = "productId", target = "product")
    ProductInventoryLimit requestToEntity(ProductInventoryLimitRequest request);

    @Override
    @Mapping(source = "productId", target = "product")
    ProductInventoryLimit partialUpdate(@MappingTarget ProductInventoryLimit entity, ProductInventoryLimitRequest request);

}
