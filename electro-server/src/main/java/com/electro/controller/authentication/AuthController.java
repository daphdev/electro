package com.electro.controller.authentication;

import com.electro.config.security.JwtUtils;
import com.electro.constant.AppConstants;
import com.electro.dto.authentication.JwtResponse;
import com.electro.dto.authentication.LoginRequest;
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

    AuthenticationManager authenticationManager;

    JwtUtils jwtUtils;

    @PostMapping("login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse("Login success!", jwt, Instant.now()));
    }

}
