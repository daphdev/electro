package com.electro.controller.client;

import com.electro.constant.AppConstants;
import com.electro.constant.FieldName;
import com.electro.constant.ResourceName;
import com.electro.dto.ListResponse;
import com.electro.dto.client.ClientPreorderRequest;
import com.electro.dto.client.ClientPreorderResponse;
import com.electro.entity.client.Preorder;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.client.ClientPreorderMapper;
import com.electro.repository.client.PreorderRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/client-api/preorders")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class ClientPreorderController {

    private PreorderRepository preorderRepository;
    private ClientPreorderMapper clientPreorderMapper;

    @GetMapping
    public ResponseEntity<ListResponse<ClientPreorderResponse>> getAllPreorders(
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter") String filter
    ) {
        Page<Preorder> preorders = preorderRepository.findAll(sort, filter, PageRequest.of(page - 1, size));
        List<ClientPreorderResponse> clientPreorderResponses = preorders.map(clientPreorderMapper::entityToResponse).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ListResponse.of(clientPreorderResponses, preorders));
    }

    @PostMapping
    public ResponseEntity<ClientPreorderResponse> createPreorder(@RequestBody ClientPreorderRequest request) {
        Preorder entity = clientPreorderMapper.requestToEntity(request);
        entity = preorderRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(clientPreorderMapper.entityToResponse(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientPreorderResponse> updatePreorder(@PathVariable Long id,
                                                                 @RequestBody ClientPreorderRequest request) {
        ClientPreorderResponse clientPreorderResponse = preorderRepository.findById(id)
                .map(existingEntity -> clientPreorderMapper.partialUpdate(existingEntity, request))
                .map(preorderRepository::save)
                .map(clientPreorderMapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.PREORDER, FieldName.ID, id));
        return ResponseEntity.status(HttpStatus.OK).body(clientPreorderResponse);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePreorders(@RequestBody List<Long> ids) {
        preorderRepository.deleteAllById(ids);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
