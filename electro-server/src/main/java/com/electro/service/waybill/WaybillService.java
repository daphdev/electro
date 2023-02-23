package com.electro.service.waybill;

import com.electro.dto.waybill.GhnCallbackOrderRequest;
import com.electro.dto.waybill.WaybillRequest;
import com.electro.dto.waybill.WaybillResponse;
import com.electro.service.CrudService;

public interface WaybillService extends CrudService<Long, WaybillRequest, WaybillResponse> {

    void callbackStatusWaybillFromGHN(GhnCallbackOrderRequest ghnCallbackOrderRequest);

}
