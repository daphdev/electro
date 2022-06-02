package com.electro.dto.login;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String message;
    private String token;
    private Instant createAt;
}
