package com.electro.service.inventory;

import com.electro.dto.inventory.CountVariantRequest;
import com.electro.dto.inventory.CountVariantResponse;
import com.electro.entity.inventory.CountVariantKey;
import com.electro.service.CrudService;

public interface CountVariantService extends CrudService<CountVariantKey, CountVariantRequest, CountVariantResponse> {}
