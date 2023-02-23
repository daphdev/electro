package com.electro.repository.general;

import com.electro.entity.general.Notification;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NotificationRepository extends JpaRepository<Notification, Long>, JpaSpecificationExecutor<Notification> {

    default Page<Notification> findAllByUsername(String username, String sort, String filter, Pageable pageable) {
        Specification<Notification> sortable = RSQLJPASupport.toSort(sort);
        Specification<Notification> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Notification> usernameSpec = RSQLJPASupport.toSpecification("user.username==" + username);
        return findAll(sortable.and(filterable).and(usernameSpec), pageable);
    }

}
