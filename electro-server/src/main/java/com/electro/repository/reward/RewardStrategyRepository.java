package com.electro.repository.reward;

import com.electro.entity.reward.RewardStrategy;
import com.electro.entity.reward.RewardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface RewardStrategyRepository extends JpaRepository<RewardStrategy, Long>, JpaSpecificationExecutor<RewardStrategy> {

    Optional<RewardStrategy> findByCodeAndStatus(RewardType code, Integer status);

}
