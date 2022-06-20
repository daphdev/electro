package com.electro.mapper.product;

import com.electro.dto.product.TagRequest;
import com.electro.dto.product.TagResponse;
import com.electro.entity.product.Tag;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TagMapper extends GenericMapper<Tag, TagRequest, TagResponse> {
}
