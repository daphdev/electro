package com.electro.dto.order;

import com.electro.dto.product.VariantResponse;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderVariantResponse {
    private VariantResponse variant;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal amount;

}
