package com.electro.service.chat;

import com.electro.constant.SearchFields;
import com.electro.dto.ListResponse;
import com.electro.dto.chat.MessageRequest;
import com.electro.dto.chat.MessageResponse;
import com.electro.entity.authentication.User;
import com.electro.entity.chat.Message;
import com.electro.entity.chat.Room;
import com.electro.mapper.chat.MessageMapper;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.chat.MessageRepository;
import com.electro.repository.chat.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService{
    private MessageRepository messageRepository;

    private RoomRepository roomRepository;

    private UserRepository userRepository;

    private MessageMapper messageMapper;

    @Override
    public ListResponse<MessageResponse> findAll(int page, int size, String sort, String filter, String search, boolean all) {
        return defaultFindAll(page, size, sort, filter, search, all, SearchFields.MESSAGE, messageRepository, messageMapper);
    }

    @Override
    public MessageResponse findById(Long id) {
        return null;
    }

    @Override
    public MessageResponse save(MessageRequest request) {
        Message message = messageMapper.requestToEntity(request);

        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if(userOptional.isPresent()){
            User user = userOptional.get();
            message.setUser(user);
        }

        message = messageRepository.save(message);

        Optional<Room> room = roomRepository.findById(request.getRoomId());
         if(room.isPresent()){
            Room _room = room.get();
             _room.setLastMessage(message);
             _room.setUpdatedAt(Instant.now());
            roomRepository.save(_room);
        };

        return messageMapper.entityToResponse(message);
    }

    @Override
    public MessageResponse save(Long id, MessageRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void delete(List<Long> ids) {

    }
}
