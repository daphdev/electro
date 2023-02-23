package com.electro.service.chat;

import com.electro.dto.chat.MessageRequest;
import com.electro.dto.chat.MessageResponse;
import com.electro.service.CrudService;

public interface MessageService extends CrudService<Long, MessageRequest, MessageResponse> {}
