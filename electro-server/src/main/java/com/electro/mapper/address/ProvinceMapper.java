package com.electro.mapper.address;

import com.electro.dto.address.ProvinceRequest;
import com.electro.dto.address.ProvinceResponse;
import com.electro.entity.address.Province;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProvinceMapper extends GenericMapper<Province, ProvinceRequest, ProvinceResponse> {
}
