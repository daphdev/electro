package com.electro.repository.inventory;

import com.electro.entity.inventory.TransferVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TransferVariantRepository extends JpaRepository<TransferVariant, Long>, JpaSpecificationExecutor<TransferVariant> {
}
