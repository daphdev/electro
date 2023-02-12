package com.electro.dto.authentication;

import lombok.Data;

@Data
public class TokenRefreshRequest {
    private String refreshToken;
}
