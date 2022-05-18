package com.electro.repository.address;

import com.electro.entity.address.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DistrictRepository extends JpaRepository<District, Long>, JpaSpecificationExecutor<District> {
}
