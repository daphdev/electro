package com.electro.mapper.product;

import com.electro.dto.product.GuaranteeRequest;
import com.electro.dto.product.GuaranteeResponse;
import com.electro.entity.product.Guarantee;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GuaranteeMapper extends GenericMapper<Guarantee, GuaranteeRequest, GuaranteeResponse> {
}
