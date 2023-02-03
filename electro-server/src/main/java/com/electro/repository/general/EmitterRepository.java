package com.electro.repository.general;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Optional;

public interface EmitterRepository {

    void addOrReplaceEmitter(String uuid, String uniqueKey, SseEmitter emitter);

    void remove(String uniqueKey);

    Optional<SseEmitter> getByUniqueKey(String uniqueKey);

    Optional<SseEmitter> getByUuid(String uuid);

    String getUuidByUniqueKey(String uniqueKey);

}
