package com.electro.mapper.inventory;

import com.electro.dto.inventory.TransferRequest;
import com.electro.dto.inventory.TransferResponse;
import com.electro.entity.inventory.Transfer;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {MapperUtils.class, TransferVariantMapper.class})
public interface TransferMapper extends GenericMapper<Transfer, TransferRequest, TransferResponse> {

    @Override
    @BeanMapping(qualifiedByName = "attachTransfer")
    Transfer requestToEntity(TransferRequest request);

    @Override
    @BeanMapping(qualifiedByName = "attachTransfer")
    Transfer partialUpdate(@MappingTarget Transfer entity, TransferRequest request);

}
