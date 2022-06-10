package com.electro.utils;

import com.electro.entity.BaseEntity;
import com.electro.entity.authentication.User;
import com.electro.repository.authentication.RoleRepository;
import lombok.AllArgsConstructor;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
@AllArgsConstructor
public class AttachUtils {

    private RoleRepository roleRepository;

    @AfterMapping
    @Named("attachUser")
    public User attachUser(@MappingTarget User user) {
        return user.setRoles(attachSet(user.getRoles(), roleRepository));
    }

    private <E extends BaseEntity> Set<E> attachSet(Set<E> entities, JpaRepository<E, Long> repository) {
        Set<E> detachedSet = Optional.ofNullable(entities).orElseGet(HashSet::new);
        Set<E> attachedSet = new HashSet<>();

        for (E entity : detachedSet) {
            if (entity.getId() != null) {
                repository.findById(entity.getId()).ifPresent(attachedSet::add);
            } else {
                attachedSet.add(entity);
            }
        }

        return attachedSet;
    }

}
