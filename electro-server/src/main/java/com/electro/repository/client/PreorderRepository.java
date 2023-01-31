package com.electro.repository.client;

import com.electro.entity.client.Preorder;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreorderRepository extends JpaRepository<Preorder, Long>, JpaSpecificationExecutor<Preorder> {

    default Page<Preorder> findAll(String sort, String filter, Pageable pageable) {
        Specification<Preorder> sortable = RSQLJPASupport.toSort(sort);
        Specification<Preorder> filterable = RSQLJPASupport.toSpecification(filter);
        return findAll(sortable.and(filterable), pageable);
    }

}
