package com.electro.controller.authentication;

import com.electro.config.security.JwtUtils;
import com.electro.dto.authentication.JwtResponse;
import com.electro.dto.authentication.LoginRequest;
import com.electro.dto.authentication.RegistrationRequest;
import com.electro.dto.authentication.RegistrationResponse;
import com.electro.dto.authentication.ResetPasswordRequest;
import com.electro.dto.authentication.UserRequest;
import com.electro.service.auth.VerificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    private AuthenticationManager authenticationManager;
    private VerificationService verificationService;
    private JwtUtils jwtUtils;

    @PostMapping("login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse("Login success!", jwt, Instant.now()));
    }

    @PostMapping("/registration")
    public ResponseEntity<RegistrationResponse> registerUser(@RequestBody UserRequest userRequest) {
        Long userId = verificationService.generateTokenVerify(userRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new RegistrationResponse(userId));
    }

    @GetMapping("/registration/{userId}/resend-token")
    public ResponseEntity<Void> resendRegistrationToken(@PathVariable Long userId) {
        verificationService.resendRegistrationToken(userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/registration/confirm")
    public ResponseEntity<Void> confirmRegistration(@RequestBody RegistrationRequest registration) {
        verificationService.confirmRegistration(registration);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/registration/{userId}/change-email")
    public ResponseEntity<Void> changeRegistrationEmail(@PathVariable Long userId, @RequestParam String email) {
        verificationService.changeRegistrationEmail(userId, email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestParam String email) {
        verificationService.forgetPassword(email);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest resetPassword) {
        verificationService.resetPassword(resetPassword);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
