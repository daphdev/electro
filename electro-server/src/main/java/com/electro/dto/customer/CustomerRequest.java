package com.electro.dto.customer;

import com.electro.dto.authentication.UserRequest;
import lombok.Data;

@Data
public class CustomerRequest {
    private UserRequest user;
    private Long customerGroupId;
    private Long customerResourceId;
    private Long customerStatusId;
}
