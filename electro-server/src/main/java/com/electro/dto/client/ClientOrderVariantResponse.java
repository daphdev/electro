package com.electro.dto.client;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;

@Data
public class ClientOrderVariantResponse {
    private ClientVariantResponse orderItemVariant;
    private BigDecimal orderItemPrice;
    private Integer orderItemQuantity;
    private BigDecimal orderItemAmount;

    @Data
    public static class ClientVariantResponse {
        private Long variantId;
        private ClientProductResponse variantProduct;
        @Nullable
        private JsonNode variantProperties;

        @Data
        public static class ClientProductResponse {
            private Long productId;
            private String productName;
            private String productSlug;
            @Nullable
            private String productThumbnail;
            private boolean productIsReviewed;
        }
    }
}
