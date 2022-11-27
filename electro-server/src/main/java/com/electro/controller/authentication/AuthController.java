package com.electro.controller.authentication;

import com.electro.config.security.JwtUtils;
import com.electro.dto.authentication.JwtResponse;
import com.electro.dto.authentication.LoginRequest;
import com.electro.dto.authentication.RegistrationRequest;
import com.electro.dto.authentication.RegistrationResponse;
import com.electro.dto.authentication.UserRequest;
import com.electro.service.auth.VerificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    AuthenticationManager authenticationManager;

    VerificationService verificationService;

    JwtUtils jwtUtils;

    @PostMapping("login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse("Login success!", jwt, Instant.now()));
    }

    @PostMapping("registration")
    public ResponseEntity<?> registerUser(@RequestBody UserRequest userRequest) {
        Long userId = verificationService.generateTokenVerify(userRequest);
        return ResponseEntity.ok(new RegistrationResponse(userId));
    }

    @GetMapping("resend-registration-token/{userId}")
    public ResponseEntity<?> resendRegistrationToken(@PathVariable(name = "userId") Long userId) {
        verificationService.resendRegistrationToken(userId);
        return ResponseEntity.ok("successful!");
    }

    @PostMapping("registration-confirm")
    public ResponseEntity<?>  confirmRegistration(@RequestBody RegistrationRequest registration) {
        verificationService.confirmRegistration(registration);
        return ResponseEntity.ok("successful!");
    }

    @PostMapping("change-registration-email/{userId}")
    public ResponseEntity<?>  changeRegistrationEmail(@PathVariable(name = "userId") Long userId, @RequestParam( name = "email") String email) {

        verificationService.changeRegistrationEmail(userId, email);
        return ResponseEntity.ok("successful!");
    }
}
