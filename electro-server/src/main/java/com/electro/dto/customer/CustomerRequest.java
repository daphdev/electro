package com.electro.dto.customer;
import com.electro.dto.authentication.UserRequest;
import lombok.Data;

@Data
public class CustomerRequest {
    UserRequest user;
    Long customerGroupId;
    Long customerResourceId;
    Long customerStatusId;
}
