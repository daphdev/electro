package com.electro.repository.waybill;

import com.electro.entity.waybill.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface WaybillRepository  extends JpaRepository<Waybill, Long>, JpaSpecificationExecutor<Waybill> {
    Optional<Waybill> findByOrder_Id(Long id);

}
