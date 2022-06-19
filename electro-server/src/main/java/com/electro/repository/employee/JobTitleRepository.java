package com.electro.repository.employee;

import com.electro.entity.employee.JobTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface JobTitleRepository extends JpaRepository<JobTitle, Long>, JpaSpecificationExecutor<JobTitle> {
}