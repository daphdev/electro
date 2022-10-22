package com.electro.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageRequest {
    private String content;
    private Long roomId;
    private Long userId;
    private Integer status;
}
