package com.electro.repository.client;

import com.electro.entity.client.Review;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

    default Page<Review> findAll(String sort, String filter, Pageable pageable) {
        Specification<Review> sortable = RSQLJPASupport.toSort(sort);
        Specification<Review> filterable = RSQLJPASupport.toSpecification(filter);
        return findAll(sortable.and(filterable), pageable);
    }

}
