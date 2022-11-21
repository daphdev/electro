package com.electro.service.email;


public interface EmailSenderService {
    void sendTokenVerification(String toEmail, String token);
}
