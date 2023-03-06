package com.electro.repository.authentication;

import com.electro.entity.authentication.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsUserByUsername(String username);

    boolean existsUserByEmail(String email);

    Optional<User> findByEmailAndResetPasswordToken(String email, String resetPasswordToken);

//    @Query(value = "SELECT COUNT(id) AS numberOfRegistration, DATE(created_at) AS date FROM User GROUP BY DATE(created_at) ORDER BY DATE(created_at) ASC", nativeQuery = true)
//    List<StatisticResource> getUserCountByCreateDate();

//    @Query(value = "SELECT NEW com.electro.dto.statistic.StatisticResource(COUNT(u.id), DATE(u.created_at)) FROM User u GROUP BY DATE(u.created_at) ORDER BY DATE(u.created_at) ASC")
//    List<StatisticResource> getUserCountByCreateDate();

}
