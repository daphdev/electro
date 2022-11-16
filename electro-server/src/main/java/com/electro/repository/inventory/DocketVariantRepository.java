package com.electro.repository.inventory;

import com.electro.entity.inventory.DocketVariant;
import com.electro.entity.inventory.DocketVariantKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DocketVariantRepository extends JpaRepository<DocketVariant, DocketVariantKey>,
        JpaSpecificationExecutor<DocketVariant> {}
