package com.electro.repository.authentication;

import com.electro.dto.statistic.StatisticResource;
import com.electro.entity.authentication.User;
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
public class UserProjectionRepository {

    private EntityManager em;

    public List<StatisticResource> getUserCountByCreateDate() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatisticResource> query = cb.createQuery(StatisticResource.class);

        Root<User> user = query.from(User.class);
        query.select(cb.construct(StatisticResource.class, user.get("createdAt").as(Instant.class), cb.count(user.get("id"))));
        query.groupBy(user.get("createdAt").as(Instant.class));
        query.orderBy(cb.asc(user.get("createdAt")));

        return em.createQuery(query).getResultList();
    }

}
