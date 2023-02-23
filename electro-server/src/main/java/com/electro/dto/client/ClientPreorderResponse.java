package com.electro.dto.client;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class ClientPreorderResponse {
    private Long preorderId;
    private Instant preorderCreatedAt;
    private Instant preorderUpdatedAt;
    private ClientListedProductResponse preorderProduct;
    private Integer preorderStatus;
}
