package com.electro.entity.inventory;

import com.electro.entity.product.Variant;
import lombok.Data;

import java.util.List;

@Data
public class VariantInventory {
    private Variant variant;
    private List<DocketVariant> transactions;
    private Integer actualInventory;
    private Integer waitingForDelivery;
    private Integer canBeSold;
    private Integer areComing;
}
