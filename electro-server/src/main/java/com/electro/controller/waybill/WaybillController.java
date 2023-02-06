package com.electro.controller.waybill;

import com.electro.constant.AppConstants;
import com.electro.dto.waybill.WaybillRequest;
import com.electro.dto.waybill.WaybillResponse;
import com.electro.service.waybill.WaybillService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/waybill")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class WaybillController {

    private WaybillService waybillService;

    @PostMapping
    public ResponseEntity<WaybillResponse> createWaybill(@RequestBody WaybillRequest waybillRequest) {
        WaybillResponse waybillResponse = waybillService.save(waybillRequest);
        return  ResponseEntity.status(HttpStatus.OK).body(waybillResponse);
    }


}
