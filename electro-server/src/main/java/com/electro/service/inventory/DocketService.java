package com.electro.service.inventory;

import com.electro.dto.inventory.DocketRequest;
import com.electro.dto.inventory.DocketResponse;
import com.electro.service.CrudService;

public interface DocketService extends CrudService<Long, DocketRequest, DocketResponse> {}
