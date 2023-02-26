package com.electro.dto.chat;

import lombok.Data;

import java.util.List;

@Data
public class ClientRoomExistenceResponse {
    private boolean roomExistence;
    private RoomResponse roomResponse;
    private List<MessageResponse> roomRecentMessages;
}
