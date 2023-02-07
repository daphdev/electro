package com.electro.repository.review;

import com.electro.entity.review.Review;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

    default Page<Review> findAllByProductId(Long productId, String sort, String filter, Pageable pageable) {
        Specification<Review> sortable = RSQLJPASupport.toSort(sort);
        Specification<Review> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Review> productIdSpec = RSQLJPASupport.toSpecification("product.id==" + productId);
        return findAll(sortable.and(filterable).and(productIdSpec), pageable);
    }

    default Page<Review> findAllByUsername(String username, String sort, String filter, Pageable pageable) {
        Specification<Review> sortable = RSQLJPASupport.toSort(sort);
        Specification<Review> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Review> usernameSpec = RSQLJPASupport.toSpecification("user.username==" + username);
        return findAll(sortable.and(filterable).and(usernameSpec), pageable);
    }

}
