package com.electro.controller.inventory;

import com.electro.constant.AppConstants;
import com.electro.dto.inventory.DocketVariantKeyRequest;
import com.electro.entity.inventory.DocketVariantKey;
import com.electro.service.inventory.DocketVariantService;
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
@RequestMapping("/api/docket-variants")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
public class DocketVariantController {

    private DocketVariantService docketVariantService;

    @DeleteMapping("/{docketId}/{variantId}")
    public ResponseEntity<Void> deleteDocketVariant(@PathVariable("docketId") Long docketId,
                                                    @PathVariable("variantId") Long variantId) {
        DocketVariantKey id = new DocketVariantKey(docketId, variantId);
        docketVariantService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteDocketVariants(@RequestBody List<DocketVariantKeyRequest> idRequests) {
        List<DocketVariantKey> ids = idRequests.stream()
                .map(idRequest -> new DocketVariantKey(idRequest.getDocketId(), idRequest.getVariantId()))
                .collect(Collectors.toList());
        docketVariantService.delete(ids);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
