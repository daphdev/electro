package com.electro.mapper.general;

import com.electro.dto.general.ImageRequest;
import com.electro.dto.general.ImageResponse;
import com.electro.entity.general.Image;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageMapper extends GenericMapper<Image, ImageRequest, ImageResponse> {}
