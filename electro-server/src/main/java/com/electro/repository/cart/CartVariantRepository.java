package com.electro.repository.cart;

import com.electro.entity.cart.CartVariant;
import com.electro.entity.cart.CartVariantKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CartVariantRepository extends JpaRepository<CartVariant, CartVariantKey>,
        JpaSpecificationExecutor<CartVariant> {}
