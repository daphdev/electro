package com.electro.repository.inventory;

import com.electro.entity.inventory.DocketVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DocketVariantRepository extends JpaRepository<DocketVariant, Long>, JpaSpecificationExecutor<DocketVariant> {
}
