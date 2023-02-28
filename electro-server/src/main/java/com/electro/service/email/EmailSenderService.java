package com.electro.service.email;

import java.util.Map;

public interface EmailSenderService {

    void sendVerificationToken(String toEmail, Map<String, Object> attributes);

    void sendForgetPasswordToken(String toEmail, Map<String, Object> attributes);

}
