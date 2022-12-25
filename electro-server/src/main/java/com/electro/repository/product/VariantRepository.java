package com.electro.repository.product;

import com.electro.entity.product.Variant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface VariantRepository extends JpaRepository<Variant, Long>, JpaSpecificationExecutor<Variant> {

    @Query("SELECT DISTINCT v " +
            "FROM DocketVariant dv " +
            "JOIN dv.variant v " +
            "ORDER BY dv.docket.id DESC")
    Page<Variant> findDocketedVariants(Pageable pageable);

}
