package com.electro.mapper.inventory;

import com.electro.dto.inventory.DockerReasonRequest;
import com.electro.dto.inventory.DockerReasonResponse;
import com.electro.entity.inventory.DocketReason;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface DocketReasonMapper extends GenericMapper<DocketReason, DockerReasonRequest, DockerReasonResponse> {

}
