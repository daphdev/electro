package com.electro.service.email;

public interface EmailSenderService {

    void sendVerificationToken(String toEmail, String token);

    void sendForgetPasswordToken(String toEmail, String link);

}
