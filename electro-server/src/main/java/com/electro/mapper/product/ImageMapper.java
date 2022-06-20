package com.electro.mapper.product;

import com.electro.dto.product.ImageRequest;
import com.electro.dto.product.ImageResponse;
import com.electro.entity.product.Image;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageMapper extends GenericMapper<Image, ImageRequest, ImageResponse> {
}
