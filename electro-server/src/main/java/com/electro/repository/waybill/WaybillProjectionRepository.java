package com.electro.repository.waybill;

import com.electro.dto.statistic.StatisticResource;
import com.electro.entity.waybill.Waybill;
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
public class WaybillProjectionRepository {

    private EntityManager em;

    public List<StatisticResource> getWaybillCountByCreateDate() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatisticResource> query = cb.createQuery(StatisticResource.class);

        Root<Waybill> waybill = query.from(Waybill.class);
        query.select(cb.construct(StatisticResource.class, waybill.get("createdAt").as(Instant.class), cb.count(waybill.get("id"))));
        query.groupBy(waybill.get("createdAt").as(Instant.class));
        query.orderBy(cb.asc(waybill.get("createdAt")));

        return em.createQuery(query).getResultList();
    }

}
