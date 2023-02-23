package com.electro.repository.client;

import com.electro.entity.client.Wish;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface WishRepository extends JpaRepository<Wish, Long>, JpaSpecificationExecutor<Wish> {

    default Page<Wish> findAllByUsername(String username, String sort, String filter, Pageable pageable) {
        Specification<Wish> sortable = RSQLJPASupport.toSort(sort);
        Specification<Wish> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Wish> usernameSpec = RSQLJPASupport.toSpecification("user.username==" + username);
        return findAll(sortable.and(filterable).and(usernameSpec), pageable);
    }

    Optional<Wish> findByUser_IdAndProduct_Id(Long userId, Long productId);

}
