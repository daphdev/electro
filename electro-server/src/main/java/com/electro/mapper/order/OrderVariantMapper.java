package com.electro.mapper.order;

import com.electro.dto.order.OrderVariantRequest;
import com.electro.dto.order.OrderVariantResponse;
import com.electro.entity.order.OrderVariant;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface OrderVariantMapper extends GenericMapper<OrderVariant, OrderVariantRequest, OrderVariantResponse> {

    @Override
    @Mapping(source = "variantId", target = "variant")
    OrderVariant requestToEntity(OrderVariantRequest request);

    @Override
    @Mapping(source = "variantId", target = "variant")
    OrderVariant partialUpdate(@MappingTarget OrderVariant entity, OrderVariantRequest request);

}
