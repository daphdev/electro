package com.electro.repository.product;

import com.electro.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @Query("SELECT DISTINCT p " +
            "FROM DocketVariant dv " +
            "JOIN dv.variant v " +
            "JOIN v.product p " +
            "ORDER BY dv.docket.id DESC")
    Page<Product> findDocketedProducts(Pageable pageable);

}
