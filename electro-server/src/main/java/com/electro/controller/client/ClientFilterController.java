package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.dto.client.ClientBrandResponse;
import com.electro.dto.client.ClientFilterResponse;
import com.electro.entity.product.Brand;
import com.electro.repository.product.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/client-api/filters")
@AllArgsConstructor
@CrossOrigin(AppConstants.FRONTEND_HOST)
public class ClientFilterController {

    private BrandRepository brandRepository;

    @GetMapping("/category")
    public ResponseEntity<ClientFilterResponse> getFilterByCategorySlug(@RequestParam String slug) {
        List<Brand> brands = brandRepository.findByCategorySlug(slug);
        ClientFilterResponse clientFilterResponse = new ClientFilterResponse();
        clientFilterResponse.setFilterBrands(mapToClientBrandResponse(brands));
        return ResponseEntity.status(HttpStatus.OK).body(clientFilterResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<ClientFilterResponse> getFilterBySearchQuery(@RequestParam String query) {
        List<Brand> brands = brandRepository.findBySearchQuery(query);
        ClientFilterResponse clientFilterResponse = new ClientFilterResponse();
        clientFilterResponse.setFilterBrands(mapToClientBrandResponse(brands));
        return ResponseEntity.status(HttpStatus.OK).body(clientFilterResponse);
    }

    private List<ClientBrandResponse> mapToClientBrandResponse(List<Brand> brands) {
        return brands.stream()
                .map(brand -> new ClientBrandResponse()
                        .setBrandId(brand.getId())
                        .setBrandName(brand.getName()))
                .collect(Collectors.toList());
    }

}
