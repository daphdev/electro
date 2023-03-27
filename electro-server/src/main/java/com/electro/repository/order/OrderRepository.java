package com.electro.repository.order;

import com.electro.entity.order.Order;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    default Page<Order> findAllByUsername(String username, String sort, String filter, Pageable pageable) {
        Specification<Order> sortable = RSQLJPASupport.toSort(sort);
        Specification<Order> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Order> usernameSpec = RSQLJPASupport.toSpecification("user.username==" + username);
        return findAll(sortable.and(filterable).and(usernameSpec), pageable);
    }

    Optional<Order> findByCode(String code);

    Optional<Order> findByPaypalOrderId(String paypalOrderId);

    @Query("SELECT COUNT(o.id) FROM Order o")
    int countByOrderId();

}
