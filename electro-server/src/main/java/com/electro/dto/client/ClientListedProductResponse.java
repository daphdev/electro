package com.electro.dto.client;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.lang.Nullable;

import java.util.List;

@Data
@Accessors(chain = true)
public class ClientListedProductResponse {
    private Long productId;
    private String productName;
    private String productSlug;
    @Nullable
    private String productThumbnail;
    private List<Double> productPriceRange;
    private List<ClientListedVariantResponse> productVariants;
    private boolean productSaleable;
    @Nullable
    private ClientPromotionResponse productPromotion;

    @Data
    @Accessors(chain = true)
    public static class ClientListedVariantResponse {
        private Long variantId;
        private Double variantPrice;
        @Nullable
        private JsonNode variantProperties;
    }
}
