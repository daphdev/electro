package com.electro.controller.waybill;

import com.electro.constant.AppConstants;
import com.electro.dto.waybill.GHNCallbackOrderRequest;
import com.electro.service.waybill.WaybillService;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/waybills")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class WaybillCallbackController {

    private WaybillService waybillService;

    @PutMapping("/callback-ghn")
    public ResponseEntity<ObjectNode> callbackStatusWaybillGHN(@RequestBody GHNCallbackOrderRequest ghnCallbackRequest) {
        waybillService.callbackStatusWaybillGHN(ghnCallbackRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ObjectNode(JsonNodeFactory.instance));
    }
}
