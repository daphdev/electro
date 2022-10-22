package com.electro.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class MessageResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
    private Integer status;
    private MessageResponse.UserChatResponse user;
    @Data
    @AllArgsConstructor
    public static class UserChatResponse {
        private Long id;
        private String username;
        private String fullname;
        private String email;
    }
}
