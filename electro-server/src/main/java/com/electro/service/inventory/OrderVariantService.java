package com.electro.service.inventory;

import com.electro.dto.order.OrderVariantRequest;
import com.electro.dto.order.OrderVariantResponse;
import com.electro.entity.order.OrderVariantKey;
import com.electro.service.CrudService;

public interface OrderVariantService extends CrudService<OrderVariantKey, OrderVariantRequest, OrderVariantResponse> {}
