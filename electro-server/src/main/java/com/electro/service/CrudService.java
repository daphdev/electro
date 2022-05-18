package com.electro.service;

import com.electro.constant.FieldName;
import com.electro.dto.ListWrapperResponse;
import com.electro.dto.PagedListResponse;
import com.electro.exception.ResourceNotFoundException;
import com.electro.mapper.GenericMapper;
import com.electro.utils.SearchUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface CrudService<I, O> {

    ListWrapperResponse findAll(int page, int size, String sort, String filter, String search, boolean all);

    O findById(Long id);

    O save(I request);

    O save(Long id, I request);

    void delete(Long id);

    void delete(List<Long> ids);

    default O save(JsonNode request, Class<I> requestType) {
        ObjectMapper mapper = new ObjectMapper();
        I typedRequest = mapper.convertValue(request, requestType);
        return save(typedRequest);
    }

    default O save(Long id, JsonNode request, Class<I> requestType) {
        ObjectMapper mapper = new ObjectMapper();
        I typedRequest = mapper.convertValue(request, requestType);
        return save(id, typedRequest);
    }

    default <E> ListWrapperResponse defaultFindAll(int page, int size,
                                                   String sort, String filter,
                                                   String search, boolean all,
                                                   List<String> searchFields,
                                                   JpaSpecificationExecutor<E> repository,
                                                   GenericMapper<E, I, O> mapper) {
        Specification<E> sortable = RSQLJPASupport.toSort(sort);
        Specification<E> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<E> searchable = SearchUtils.parse(search, searchFields);
        Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
        Page<E> entities = repository.findAll(sortable.and(filterable).and(searchable), pageable);
        List<O> entityResponses = mapper.entityToResponse(entities.getContent());
        return new PagedListResponse<>(entityResponses, entities);
    }

    default <E> O defaultFindById(Long id,
                                  JpaRepository<E, Long> repository,
                                  GenericMapper<E, I, O> mapper,
                                  String resourceName) {
        return repository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName, FieldName.ID, id));
    }

    default <E> O defaultSave(I request,
                              JpaRepository<E, Long> repository,
                              GenericMapper<E, I, O> mapper) {
        E entity = mapper.requestToEntity(request);
        entity = repository.save(entity);
        return mapper.entityToResponse(entity);
    }

    default <E> O defaultSave(Long id, I request,
                              JpaRepository<E, Long> repository,
                              GenericMapper<E, I, O> mapper,
                              String resourceName) {
        return repository.findById(id)
                .map(existingEntity -> mapper.partialUpdate(existingEntity, request))
                .map(repository::save)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName, FieldName.ID, id));
    }

}
