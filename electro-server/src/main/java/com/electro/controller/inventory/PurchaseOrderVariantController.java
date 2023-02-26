package com.electro.controller.inventory;

import com.electro.constant.AppConstants;
import com.electro.dto.inventory.PurchaseOrderVariantKeyRequest;
import com.electro.entity.inventory.PurchaseOrderVariantKey;
import com.electro.service.inventory.PurchaseOrderVariantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/purchase-order-variants")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
public class PurchaseOrderVariantController {

    private PurchaseOrderVariantService purchaseOrderVariantService;

    @DeleteMapping("/{purchaseOrderId}/{variantId}")
    public ResponseEntity<Void> deletePurchaseOrderVariant(@PathVariable("purchaseOrderId") Long purchaseOrderId,
                                                           @PathVariable("variantId") Long variantId) {
        PurchaseOrderVariantKey id = new PurchaseOrderVariantKey(purchaseOrderId, variantId);
        purchaseOrderVariantService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePurchaseOrderVariants(@RequestBody List<PurchaseOrderVariantKeyRequest> idRequests) {
        List<PurchaseOrderVariantKey> ids = idRequests.stream()
                .map(idRequest -> new PurchaseOrderVariantKey(idRequest.getPurchaseOrderId(), idRequest.getVariantId()))
                .collect(Collectors.toList());
        purchaseOrderVariantService.delete(ids);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
