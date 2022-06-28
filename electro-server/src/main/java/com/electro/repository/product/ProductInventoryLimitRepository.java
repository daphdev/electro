package com.electro.repository.product;

import com.electro.entity.product.ProductInventoryLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductInventoryLimitRepository extends JpaRepository<ProductInventoryLimit, Long>, JpaSpecificationExecutor<ProductInventoryLimit> {
}