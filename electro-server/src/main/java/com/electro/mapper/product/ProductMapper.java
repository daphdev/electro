package com.electro.mapper.product;

import com.electro.dto.product.ProductRequest;
import com.electro.dto.product.ProductResponse;
import com.electro.entity.product.Product;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface ProductMapper extends GenericMapper<Product, ProductRequest, ProductResponse> {
}
