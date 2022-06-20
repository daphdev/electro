package com.electro.mapper.product;

import com.electro.dto.product.ImageRequest;
import com.electro.dto.product.ImageResponse;
import com.electro.entity.product.Image;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface ImageMapper extends GenericMapper<Image, ImageRequest, ImageResponse> {

    @Override
    @Mapping(source = "productId", target = "product", qualifiedByName = "mapProductIdToProduct")
    Image requestToEntity(ImageRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "productId", target = "product", qualifiedByName = "mapProductIdToProduct")
    Image partialUpdate(@MappingTarget Image entity, ImageRequest request);
}
