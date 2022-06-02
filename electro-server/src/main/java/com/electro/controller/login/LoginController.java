package com.electro.controller.login;

import com.electro.config.security.JwtUtils;
import com.electro.dto.login.JwtResponse;
import com.electro.dto.login.LoginRequest;
import com.electro.exception.ErrorMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/login")
@AllArgsConstructor
public class LoginController {

    AuthenticationManager authenticationManager;

    JwtUtils jwtUtils;

    @PostMapping
    public ResponseEntity<?> authentication(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            String jwt = jwtUtils.generateJwtToken(authentication);

            return ResponseEntity.ok(new JwtResponse("Login success!", jwt, Instant.now()));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorMessage(400, Instant.now(), "Wrong email or password", ""));
        }

    }
}
