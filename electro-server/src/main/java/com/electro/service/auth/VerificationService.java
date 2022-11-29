package com.electro.service.auth;

import com.electro.dto.authentication.RegistrationRequest;
import com.electro.dto.authentication.UserRequest;

public interface VerificationService {
    Long generateTokenVerify(UserRequest userRequest);

    void resendRegistrationToken(Long userID);

    void confirmRegistration(RegistrationRequest registration);

    void changeRegistrationEmail(Long userId, String emailUpdate);
}
