package com.electro.service;

import com.electro.constant.FieldName;
import com.electro.dto.ListResponse;
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

public interface CrudService<ID, I, O> {

    ListResponse<O> findAll(int page, int size, String sort, String filter, String search, boolean all);

    O findById(ID id);

    O save(I request);

    O save(ID id, I request);

    void delete(ID id);

    void delete(List<ID> ids);

    default O save(JsonNode request, Class<I> requestType) {
        ObjectMapper mapper = new ObjectMapper();
        I typedRequest = mapper.convertValue(request, requestType);
        return save(typedRequest);
    }

    default O save(ID id, JsonNode request, Class<I> requestType) {
        ObjectMapper mapper = new ObjectMapper();
        I typedRequest = mapper.convertValue(request, requestType);
        return save(id, typedRequest);
    }

    default <E> ListResponse<O> defaultFindAll(int page, int size,
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
        return new ListResponse<>(entityResponses, entities);
    }

    default <E> O defaultFindById(ID id,
                                  JpaRepository<E, ID> repository,
                                  GenericMapper<E, I, O> mapper,
                                  String resourceName) {
        return repository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName, FieldName.ID, id));
    }

    default <E> O defaultSave(I request,
                              JpaRepository<E, ID> repository,
                              GenericMapper<E, I, O> mapper) {
        E entity = mapper.requestToEntity(request);
        entity = repository.save(entity);
        return mapper.entityToResponse(entity);
    }

    default <E> O defaultSave(ID id, I request,
                              JpaRepository<E, ID> repository,
                              GenericMapper<E, I, O> mapper,
                              String resourceName) {
        return repository.findById(id)
                .map(existingEntity -> mapper.partialUpdate(existingEntity, request))
                .map(repository::save)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName, FieldName.ID, id));
    }

}
