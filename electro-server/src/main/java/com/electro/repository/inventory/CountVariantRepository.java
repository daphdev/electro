package com.electro.repository.inventory;

import com.electro.entity.inventory.CountVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CountVariantRepository extends JpaRepository<CountVariant, Long>, JpaSpecificationExecutor<CountVariant> {
}
