package com.electro.repository.inventory;

import com.electro.entity.inventory.DocketVariant;
import com.electro.entity.inventory.DocketVariantKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocketVariantRepository extends JpaRepository<DocketVariant, DocketVariantKey>,
        JpaSpecificationExecutor<DocketVariant> {

    @Query("SELECT dv " +
            "FROM DocketVariant dv " +
            "JOIN dv.variant v " +
            "JOIN v.product p " +
            "WHERE p.id = :productId " +
            "ORDER BY dv.docket.id DESC")
    List<DocketVariant> findByProductId(@Param("productId") Long productId);

    @Query("SELECT dv " +
            "FROM DocketVariant dv " +
            "WHERE dv.variant.id = :variantId " +
            "ORDER BY dv.docket.id DESC")
    List<DocketVariant> findByVariantId(@Param("variantId") Long variantId);

}
