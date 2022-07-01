package com.electro.mapper.inventory;

import com.electro.dto.inventory.TransferRequest;
import com.electro.dto.inventory.TransferResponse;
import com.electro.entity.inventory.Transfer;
import com.electro.mapper.GenericMapper;
import com.electro.utils.MapperUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface TransferMapper extends GenericMapper<Transfer, TransferRequest, TransferResponse> {

    @Override
    @BeanMapping(qualifiedByName = "attachTransfer")
    @Mapping(source = "transferVariants", target = "transferVariants", qualifiedByName = "convertTransferVariants")
    Transfer requestToEntity(TransferRequest request);

    @Override
    @BeanMapping(qualifiedByName = "attachTransfer")
    @Mapping(source = "transferVariants", target = "transferVariants", qualifiedByName = "convertTransferVariants")
    Transfer partialUpdate(@MappingTarget Transfer entity, TransferRequest request);
}
