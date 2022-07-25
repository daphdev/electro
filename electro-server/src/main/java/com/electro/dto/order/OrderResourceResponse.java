package com.electro.dto.order;

import com.electro.dto.customer.CustomerResourceResponse;
import lombok.Data;

import java.time.Instant;

@Data
public class OrderResourceResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String code;
    private String name;
    private String color;
    private CustomerResourceResponse customerResource;
    private Integer status;
}
