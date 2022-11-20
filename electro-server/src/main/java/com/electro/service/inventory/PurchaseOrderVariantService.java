package com.electro.service.inventory;

import com.electro.dto.inventory.PurchaseOrderVariantRequest;
import com.electro.dto.inventory.PurchaseOrderVariantResponse;
import com.electro.entity.inventory.PurchaseOrderVariantKey;
import com.electro.service.CrudService;

public interface PurchaseOrderVariantService extends CrudService<PurchaseOrderVariantKey, PurchaseOrderVariantRequest,
        PurchaseOrderVariantResponse> {}
