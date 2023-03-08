package com.electro.repository.review;

import com.electro.entity.review.Review;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

    default Page<Review> findAllByProductSlug(String productSlug, String sort, String filter, Pageable pageable) {
        Specification<Review> sortable = RSQLJPASupport.toSort(sort);
        Specification<Review> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Review> productIdSpec = RSQLJPASupport.toSpecification("product.slug==" + productSlug);
        return findAll(sortable.and(filterable).and(productIdSpec), pageable);
    }

    default Page<Review> findAllByUsername(String username, String sort, String filter, Pageable pageable) {
        Specification<Review> sortable = RSQLJPASupport.toSort(sort);
        Specification<Review> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Review> usernameSpec = RSQLJPASupport.toSpecification("user.username==" + username);
        return findAll(sortable.and(filterable).and(usernameSpec), pageable);
    }

    @Query("SELECT COALESCE(CEILING(AVG(r.ratingScore)), 0) FROM Review r WHERE r.product.id = :productId")
    int findAverageRatingScoreByProductId(@Param("productId") Long productId);

    @Query("SELECT COUNT(r.id) FROM Review r WHERE r.product.id = :productId")
    int countByProductId(@Param("productId") Long productId);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Review r JOIN r.user u WHERE r.product.id = :productId AND u.username = :username")
    boolean existsByProductIdAndUsername(@Param("productId") Long productId, @Param("username") String username);

    @Query("SELECT COUNT(r.id) FROM Review r")
    int countByReviewId();

}
