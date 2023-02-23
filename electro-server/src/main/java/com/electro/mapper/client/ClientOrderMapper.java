package com.electro.mapper.client;

import com.electro.dto.client.ClientOrderRequest;
import com.electro.dto.client.ClientOrderResponse;
import com.electro.entity.order.Order;
import com.electro.mapper.GenericMapper;
import com.electro.mapper.authentication.UserMapper;
import com.electro.mapper.order.OrderCancellationReasonMapper;
import com.electro.mapper.order.OrderResourceMapper;
import com.electro.mapper.order.OrderVariantMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {MapperUtils.class, OrderResourceMapper.class, OrderCancellationReasonMapper.class, UserMapper.class,
                OrderVariantMapper.class})
public interface ClientOrderMapper extends GenericMapper<Order, ClientOrderRequest, ClientOrderResponse> {

    @Override
    @BeanMapping(qualifiedByName = "attachOrder")
    @Mapping(source = "orderResourceId", target = "orderResource")
    @Mapping(source = "orderCancellationReasonId", target = "orderCancellationReason")
    @Mapping(source = "userId", target = "user")
    Order requestToEntity(ClientOrderRequest request);

    @Override
    @BeanMapping(qualifiedByName = "attachOrder")
    @Mapping(source = "orderResourceId", target = "orderResource")
    @Mapping(source = "orderCancellationReasonId", target = "orderCancellationReason")
    @Mapping(source = "userId", target = "user")
    Order partialUpdate(@MappingTarget Order entity, ClientOrderRequest request);

}
