package com.electro.mapper.order;

import com.electro.dto.order.OrderCancellationReasonRequest;
import com.electro.dto.order.OrderCancellationReasonResponse;
import com.electro.entity.order.OrderCancellationReason;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderCancellationReasonMapper extends GenericMapper<OrderCancellationReason, OrderCancellationReasonRequest,
        OrderCancellationReasonResponse> {}
