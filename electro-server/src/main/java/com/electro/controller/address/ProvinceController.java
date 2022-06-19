package com.electro.controller.address;

import com.electro.service.address.ProvinceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/provinces")
@AllArgsConstructor
public class ProvinceController {

    private ProvinceService provinceService;

//    @GetMapping
//    public ResponseEntity<ListWrapperResponse> getAllProvinces(
//            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
//            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
//            @RequestParam(name = "filter", required = false) @Nullable String filter,
//            @RequestParam(name = "search", required = false) @Nullable String search,
//            @RequestParam(name = "all", required = false) boolean all
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(provinceService.findAll(page, size, sort, filter, search, all));
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ProvinceResponse> getProvince(@PathVariable("id") Long id) {
//        return ResponseEntity.status(HttpStatus.OK).body(provinceService.findById(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<ProvinceResponse> createProvince(@RequestBody ProvinceRequest provinceRequest) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(provinceService.save(provinceRequest));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<ProvinceResponse> updateProvince(@PathVariable("id") Long id,
//                                                           @RequestBody ProvinceRequest provinceRequest) {
//        return ResponseEntity.status(HttpStatus.OK).body(provinceService.save(id, provinceRequest));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteProvince(@PathVariable("id") Long id) {
//        provinceService.delete(id);
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//    }
//
//    @DeleteMapping
//    public ResponseEntity<Void> deleteProvinces(@RequestBody List<Long> ids) {
//        provinceService.delete(ids);
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//    }

}
