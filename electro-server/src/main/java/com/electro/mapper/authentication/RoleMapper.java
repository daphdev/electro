package com.electro.mapper.authentication;

import com.electro.dto.authentication.RoleRequest;
import com.electro.dto.authentication.RoleResponse;
import com.electro.entity.authentication.Role;
import com.electro.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper extends GenericMapper<Role, RoleRequest, RoleResponse> {
}
