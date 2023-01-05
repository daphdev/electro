package com.electro.dto.client;

import lombok.Data;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
public class ClientFilterResponse {
    // TODO: Complete filterPriceQuartiles
    private List<BigDecimal> filterPriceQuartiles = List.of(new BigDecimal("10000000"), new BigDecimal("50000000"));
    private List<ClientBrandResponse> filterBrands = new ArrayList<>();
}
