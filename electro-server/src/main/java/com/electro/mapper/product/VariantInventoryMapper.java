package com.electro.mapper.product;

import com.electro.dto.inventory.VariantInventoryResponse;
import com.electro.projection.inventory.VariantInventory;
import com.electro.mapper.inventory.DocketVariantMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = DocketVariantMapper.class)
public interface VariantInventoryMapper {

    VariantInventoryResponse toResponse(VariantInventory variantInventory);

    List<VariantInventoryResponse> toResponse(List<VariantInventory> variantInventory);

}
