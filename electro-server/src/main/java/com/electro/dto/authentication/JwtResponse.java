package com.electro.dto.authentication;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String message;
    private String token;
    private String refreshToken;
    private Instant createdAt;
}
