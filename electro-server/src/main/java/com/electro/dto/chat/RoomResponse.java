package com.electro.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class RoomResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private UserResponse user;
    private MessageResponse lastMessage;

    @Data
    @AllArgsConstructor
    public static class UserResponse {
        private Long id;
        private String username;
        private String fullname;
        private String email;
    }
}
