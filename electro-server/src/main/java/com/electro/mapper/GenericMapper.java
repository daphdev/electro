package com.electro.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

public interface GenericMapper<E, I, O> {

    E requestToEntity(I request);

    O entityToResponse(E entity);

    List<E> requestToEntity(List<I> requests);

    List<O> entityToResponse(List<E> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    E partialUpdate(@MappingTarget E entity, I request);

}
