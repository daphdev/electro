package com.electro.service.email;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

@Service
@AllArgsConstructor
public class EmailSenderServiceImpl implements EmailSenderService {

    private Configuration freemakerConfiguration;
    private JavaMailSender javaMailSender;

    @Override
    public void sendVerificationToken(String toEmail, String token) {
        String text = getEmailContent("verify-email.ftlh", Map.of("token", token));
        sendEmail(toEmail, "[Electro Shop] Xác thực email", text);
    }

    @Override
    public void sendForgetPasswordToken(String toEmail, String link) {
        String text = getEmailContent("forget-password-email.ftlh", Map.of("link", link));
        sendEmail(toEmail, "[Electro Shop] Quên mật khẩu", text);
    }

    private String getEmailContent(String template, Map<String, Object> model) {
        try {
            StringWriter stringWriter = new StringWriter();
            freemakerConfiguration.getTemplate(template).process(model, stringWriter);
            return stringWriter.getBuffer().toString();
        } catch (TemplateException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}
