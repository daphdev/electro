package com.electro.mapper.inventory;

import com.electro.dto.inventory.DocketReasonRequest;
import com.electro.dto.inventory.DocketReasonResponse;
import com.electro.entity.inventory.DocketReason;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DocketReasonMapper extends GenericMapper<DocketReason, DocketReasonRequest, DocketReasonResponse> {}
