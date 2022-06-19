package com.electro.dto.customer;

import com.electro.dto.authentication.UserResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class CustomerResponse {
    Long id;
    Instant createdAt;
    Instant updatedAt;
    UserResponse user;
    CustomerGroupResponse customerGroup;
    CustomerResourceResponse customerResource;
    CustomerStatusResponse customerStatus;
}
