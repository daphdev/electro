package com.electro.controller.authentication;

import com.electro.config.security.JwtUtils;
import com.electro.constant.AppConstants;
import com.electro.dto.authentication.JwtResponse;
import com.electro.dto.authentication.LoginRequest;
import com.electro.dto.authentication.TokenRefreshRequest;
import com.electro.entity.authentication.RefreshToken;
import com.electro.exception.TokenRefreshException;
import com.electro.service.authetication.RefreshTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(AppConstants.DOMAIN)
public class AuthController {

    private AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;

    private RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        String jwt = jwtUtils.generateJwtToken(authentication);

        // create token refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authentication);

        return ResponseEntity.ok(new JwtResponse("Login success!", jwt, refreshToken.getToken(), Instant.now()));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new JwtResponse("Refresh Token ", token, requestRefreshToken, Instant.now()));
                })
                .orElseThrow(() -> new TokenRefreshException("Refresh token was expired. Please make a new signin request"));
    }
}
