package com.electro.service.inventory;

import com.electro.dto.inventory.DocketVariantRequest;
import com.electro.dto.inventory.DocketVariantResponse;
import com.electro.entity.inventory.DocketVariantKey;
import com.electro.service.CrudService;

public interface DocketVariantService extends CrudService<DocketVariantKey, DocketVariantRequest, DocketVariantResponse> {}
