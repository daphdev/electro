package com.electro.dto.client;

import com.electro.dto.general.ImageResponse;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.lang.Nullable;

import java.util.List;

@Data
@Accessors(chain = true)
public class ClientProductResponse {
    private Long productId;
    private String productName;
    private String productSlug;
    @Nullable
    private String productShortDescription;
    @Nullable
    private String productDescription;
    private List<ImageResponse> productImages;
    @Nullable
    private ClientCategoryResponse productCategory;
    @Nullable
    private ClientBrandResponse productBrand;
    @Nullable
    private JsonNode productSpecifications;
    private List<ClientVariantResponse> productVariants;
    private boolean productSaleable;
    private int productAverageRatingScore;
    private int productCountReviews;
    private List<ClientListedProductResponse> productRelatedProducts;
    @Nullable
    private ClientPromotionResponse productPromotion;

    @Data
    @Accessors(chain = true)
    public static class ClientBrandResponse {
        private Long brandId;
        private String brandName;
    }

    @Data
    @Accessors(chain = true)
    public static class ClientVariantResponse {
        private Long variantId;
        private Double variantPrice;
        @Nullable
        private JsonNode variantProperties;
        private Integer variantInventory;
    }
}
