package com.electro.repository.review;

import com.electro.dto.statistic.StatisticResource;
import com.electro.entity.review.Review;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.Instant;
import java.util.List;

@Repository
@AllArgsConstructor
public class ReviewProjectionRepository {

    EntityManager em;

    public List<StatisticResource> getReviewCountByCreateDate(){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatisticResource> query = cb.createQuery(StatisticResource.class);
        Root<Review> waybill = query.from(Review.class);
        query.select(cb.construct(StatisticResource.class, cb.count(waybill.get("id")), waybill.get("createdAt").as(Instant.class)));
        query.groupBy(waybill.get("createdAt").as(Instant.class));
        query.orderBy(cb.asc(waybill.get("createdAt")));
        return em.createQuery(query).getResultList();
    }

}
