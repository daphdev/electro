package com.electro.mapper.product;

import com.electro.dto.product.UnitRequest;
import com.electro.dto.product.UnitResponse;
import com.electro.entity.product.Unit;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface UnitMapper extends GenericMapper<Unit, UnitRequest, UnitResponse> {
}
