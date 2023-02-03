package com.electro.repository.client;

import com.electro.entity.client.Preorder;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface PreorderRepository extends JpaRepository<Preorder, Long>, JpaSpecificationExecutor<Preorder> {

    default Page<Preorder> findAllByUsername(String username, String sort, String filter, Pageable pageable) {
        Specification<Preorder> sortable = RSQLJPASupport.toSort(sort);
        Specification<Preorder> filterable = RSQLJPASupport.toSpecification(filter);
        Specification<Preorder> usernameSpec = RSQLJPASupport.toSpecification("user.username==" + username);
        return findAll(sortable.and(filterable).and(usernameSpec), pageable);
    }

    Optional<Preorder> findByUser_IdAndProduct_Id(Long userId, Long productId);

    List<Preorder> findByProduct_IdInAndStatus(List<Long> productIds, Integer status);

}
