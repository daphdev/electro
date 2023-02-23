package com.electro.mapper.client;

import com.electro.dto.client.ClientCartRequest;
import com.electro.dto.client.ClientCartResponse;
import com.electro.dto.client.ClientCartVariantRequest;
import com.electro.dto.client.ClientCartVariantResponse;
import com.electro.dto.client.UpdateQuantityType;
import com.electro.entity.cart.Cart;
import com.electro.entity.cart.CartVariant;
import com.electro.entity.cart.CartVariantKey;
import com.electro.entity.general.Image;
import com.electro.entity.product.Product;
import com.electro.entity.product.Variant;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.inventory.DocketVariantRepository;
import com.electro.repository.product.VariantRepository;
import com.electro.utils.InventoryUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ClientCartMapper {

    private UserRepository userRepository;
    private VariantRepository variantRepository;
    private DocketVariantRepository docketVariantRepository;

    public Cart requestToEntity(ClientCartRequest request) {
        var entity = new Cart();
        entity.setUser(userRepository.getById(request.getUserId()));
        entity.setCartVariants(request.getCartItems().stream().map(this::requestToEntity).collect(Collectors.toSet()));
        entity.setStatus(request.getStatus());
        attach(entity);
        return entity;
    }

    public Cart partialUpdate(Cart entity, ClientCartRequest request) {
        // Cộng dồn quantity cho những mặt hàng đã có trong giỏ hàng
        List<Long> currentVariantIds = entity.getCartVariants().stream()
                .map(CartVariant::getCartVariantKey)
                .map(CartVariantKey::getVariantId)
                .collect(Collectors.toList());
        Set<CartVariant> newCartVariants = new HashSet<>();

        // TH1: Mảng entity.getCartVariants() rỗng
        if (entity.getCartVariants().size() == 0) {
            for (ClientCartVariantRequest clientCartVariantRequest : request.getCartItems()) {
                newCartVariants.add(requestToEntity(clientCartVariantRequest));
            }
        }

        // TH2: Mảng entity.getCartVariants() không rỗng
        for (CartVariant cartVariant : entity.getCartVariants()) {
            for (ClientCartVariantRequest clientCartVariantRequest : request.getCartItems()) {
                if (!currentVariantIds.contains(clientCartVariantRequest.getVariantId())) {
                    newCartVariants.add(requestToEntity(clientCartVariantRequest));
                } else if (Objects.equals(cartVariant.getCartVariantKey().getVariantId(), clientCartVariantRequest.getVariantId())) {
                    if (request.getUpdateQuantityType() == UpdateQuantityType.OVERRIDE) {
                        cartVariant.setQuantity(clientCartVariantRequest.getQuantity());
                    } else {
                        cartVariant.setQuantity(cartVariant.getQuantity() + clientCartVariantRequest.getQuantity());
                    }
                    break;
                }
            }
        }

        entity.getCartVariants().addAll(newCartVariants);
        entity.setStatus(request.getStatus());
        attach(entity);
        return entity;
    }

    private CartVariant requestToEntity(ClientCartVariantRequest request) {
        var entity = new CartVariant();
        entity.setVariant(variantRepository.getById(request.getVariantId()));
        entity.setQuantity(request.getQuantity());
        return entity;
    }

    private void attach(Cart cart) {
        cart.getCartVariants().forEach(cartVariant -> {
            cartVariant.setCartVariantKey(new CartVariantKey(cart.getId(), cartVariant.getVariant().getId()));
            cartVariant.setCart(cart);
        });
    }

    public ClientCartResponse entityToResponse(Cart entity) {
        var response = new ClientCartResponse();
        response.setCartId(entity.getId());
        // Reference: https://stackoverflow.com/a/51331393
        response.setCartItems(entity.getCartVariants().stream()
                .sorted(Comparator.comparing(CartVariant::getCreatedAt))
                .map(this::entityToResponse)
                .collect(Collectors.toCollection(LinkedHashSet::new)));
        return response;
    }

    private ClientCartVariantResponse.ClientVariantResponse.ClientProductResponse entityToResponse(Product entity) {
        var response = new ClientCartVariantResponse.ClientVariantResponse.ClientProductResponse();
        response.setProductId(entity.getId());
        response.setProductName(entity.getName());
        response.setProductSlug(entity.getSlug());
        response.setProductThumbnail(entity.getImages().stream().filter(Image::getIsThumbnail).findAny().map(Image::getPath).orElse(null));
        return response;
    }

    private ClientCartVariantResponse.ClientVariantResponse entityToResponse(Variant entity) {
        var response = new ClientCartVariantResponse.ClientVariantResponse();
        response.setVariantId(entity.getId());
        response.setVariantProduct(entityToResponse(entity.getProduct()));
        response.setVariantPrice(entity.getPrice());
        response.setVariantProperties(entity.getProperties());
        response.setVariantInventory(InventoryUtils
                .calculateInventoryIndices(docketVariantRepository.findByVariantId(entity.getId()))
                .get("canBeSold"));
        return response;
    }

    private ClientCartVariantResponse entityToResponse(CartVariant entity) {
        var response = new ClientCartVariantResponse();
        response.setCartItemVariant(entityToResponse(entity.getVariant()));
        response.setCartItemQuantity(entity.getQuantity());
        return response;
    }

}
