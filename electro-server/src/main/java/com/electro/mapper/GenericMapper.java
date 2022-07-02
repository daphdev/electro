package com.electro.mapper;

import org.mapstruct.MappingTarget;

import java.util.List;

public interface GenericMapper<E, I, O> {

    E requestToEntity(I request);

    O entityToResponse(E entity);

    List<E> requestToEntity(List<I> requests);

    List<O> entityToResponse(List<E> entities);

    E partialUpdate(@MappingTarget E entity, I request);

}
