package com.electro.service.general;

import com.electro.repository.general.EmitterRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@AllArgsConstructor
public class EmitterService {

    private final EmitterRepository emitterRepository;

    public void createEmitter(String uuid, String uniqueKey) {
        long eventsTimeout = 60 * 60 * 1000L; // 60 minutes
        SseEmitter emitter = new SseEmitter(eventsTimeout);

        emitter.onCompletion(() -> emitterRepository.remove(uniqueKey));
        emitter.onTimeout(() -> emitterRepository.remove(uniqueKey));
        emitter.onError(e -> {
            log.error("Create SseEmitter exception", e);
            emitterRepository.remove(uniqueKey);
        });

        emitterRepository.addOrReplaceEmitter(uuid, uniqueKey, emitter);
    }

    public SseEmitter getEmitterByUuid(String uuid) {
        return emitterRepository.getByUuid(uuid)
                .orElseThrow(() -> new RuntimeException(String.format("No emitter for uuid: %s", uuid)));
    }

    public boolean isExistEmitterByUniqueKey(String uniqueKey) {
        return emitterRepository.getByUniqueKey(uniqueKey).isPresent();
    }

    public String getEmitterUuidByUniqueKey(String uniqueKey) {
        return emitterRepository.getUuidByUniqueKey(uniqueKey);
    }

}
