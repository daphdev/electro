package com.electro.mapper.authentication;

import com.electro.dto.authentication.UserRequest;
import com.electro.dto.authentication.UserResponse;
import com.electro.entity.authentication.Role;
import com.electro.entity.authentication.User;
import com.electro.mapper.CustomMapperMethods;
import com.electro.mapper.GenericMapper;
import com.electro.repository.authentication.RoleRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserMapper implements GenericMapper<User, UserRequest, UserResponse>, CustomMapperMethods {

    @Autowired
    private RoleRepository roleRepository;

    @AfterMapping
    User attachRolesToPersistenceContext(@MappingTarget User user) {
        Set<Role> roles = Optional.ofNullable(user.getRoles()).orElseGet(HashSet::new);
        Set<Role> attachedRoles = new HashSet<>();

        for (Role role : roles) {
            if (role.getId() != null) {
                roleRepository.findById(role.getId()).ifPresent(attachedRoles::add);
            } else {
                attachedRoles.add(role);
            }
        }

        user.setRoles(attachedRoles);
        return user;
    }

    @Override
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    public abstract User requestToEntity(UserRequest request);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "address.provinceId", target = "address.province", qualifiedByName = "mapProvinceIdToProvince")
    @Mapping(source = "address.districtId", target = "address.district", qualifiedByName = "mapDistrictIdToDistrict")
    public abstract User partialUpdate(@MappingTarget User entity, UserRequest request);

}
