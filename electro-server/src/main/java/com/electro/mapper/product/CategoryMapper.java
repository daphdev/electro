package com.electro.mapper.product;

import com.electro.dto.product.CategoryRequest;
import com.electro.dto.product.CategoryResponse;
import com.electro.entity.product.Category;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface CategoryMapper extends GenericMapper<Category, CategoryRequest, CategoryResponse> {

    @Override
    @Mapping(source = "parentCategoryId", target = "parentCategory", qualifiedByName = "mapCategoryIdToCategory")
    Category requestToEntity(CategoryRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "parentCategoryId", target = "parentCategory", qualifiedByName = "mapCategoryIdToCategory")
    Category partialUpdate(@MappingTarget Category entity, CategoryRequest request);

}
