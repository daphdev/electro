package com.electro.repository;

import com.electro.entity.inventory.Docket;
import com.electro.entity.inventory.DocketVariant;
import com.electro.entity.product.Variant;
import com.electro.projection.inventory.SimpleProductInventory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
@AllArgsConstructor
public class ProjectionRepository {

    private EntityManager em;

    public List<SimpleProductInventory> findSimpleProductInventories(List<Long> productIds) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<SimpleProductInventory> query = cb.createQuery(SimpleProductInventory.class);

        Root<Variant> variant = query.from(Variant.class);
        Join<Variant, DocketVariant> docketVariant = variant.join("docketVariants");
        Join<DocketVariant, Docket> docket = docketVariant.join("docket");

        query.select(cb.construct(
                SimpleProductInventory.class,
                variant.get("product").get("id"),
                cb.sum(
                        cb.<Integer>selectCase()
                                .when(cb.and(cb.equal(docket.get("type"), 1),
                                                cb.equal(docket.get("status"), 3)),
                                        docketVariant.get("quantity"))
                                .when(cb.and(cb.equal(docket.get("type"), 2),
                                                cb.equal(docket.get("status"), 3)),
                                        cb.prod(docketVariant.get("quantity"), -1))
                                .otherwise(0)
                ),
                cb.sum(
                        cb.<Integer>selectCase()
                                .when(cb.and(cb.equal(docket.get("type"), 2),
                                                docket.get("status").in(1, 2)),
                                        docketVariant.get("quantity"))
                                .otherwise(0)
                ),
                cb.diff(
                        cb.sum(
                                cb.<Integer>selectCase()
                                        .when(cb.and(cb.equal(docket.get("type"), 1),
                                                        cb.equal(docket.get("status"), 3)),
                                                docketVariant.get("quantity"))
                                        .when(cb.and(cb.equal(docket.get("type"), 2),
                                                        cb.equal(docket.get("status"), 3)),
                                                cb.prod(docketVariant.get("quantity"), -1))
                                        .otherwise(0)
                        ),
                        cb.sum(
                                cb.<Integer>selectCase()
                                        .when(cb.and(cb.equal(docket.get("type"), 2),
                                                        docket.get("status").in(1, 2)),
                                                docketVariant.get("quantity"))
                                        .otherwise(0)
                        )
                ),
                cb.sum(
                        cb.<Integer>selectCase()
                                .when(cb.and(cb.equal(docket.get("type"), 1),
                                                docket.get("status").in(1, 2)),
                                        docketVariant.get("quantity"))
                                .otherwise(0)
                )
        ));

        query.where(variant.get("product").get("id").in(productIds));
        query.groupBy(variant.get("product").get("id"));

        return em.createQuery(query).getResultList();
    }

}
