package com.electro.repository.promotion;

import com.electro.entity.product.Product;
import com.electro.entity.promotion.Promotion;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long>, JpaSpecificationExecutor<Promotion> {

    default List<Promotion> findByProductId(Long productId, Instant startDate, Instant endDate) {
        Specification<Promotion> spec = (root, query, cb) -> {
            List<Predicate> wheres = new ArrayList<>();
            Join<Promotion, Product> product = root.join("products");

            wheres.add(cb.equal(product.get("id"), productId));
            wheres.add(cb.or(
                    cb.between(root.get("startDate"), startDate, endDate),
                    cb.between(root.get("endDate"), startDate, endDate)
            ));

            query.where(wheres.toArray(Predicate[]::new));
            return query.getRestriction();
        };

        return findAll(spec);
    }

    @Query("SELECT pr FROM Promotion pr JOIN pr.products p WHERE p.id = :productId AND pr.status = 1 AND " +
            "CURRENT_DATE BETWEEN pr.startDate AND pr.endDate")
    List<Promotion> findActivePromotionByProductId(@Param("productId") Long productId);

    @Query("SELECT COUNT(pr.id) FROM Promotion pr WHERE pr.status = 1 AND CURRENT_DATE BETWEEN pr.startDate AND pr.endDate")
    int countByPromotionId();

}
