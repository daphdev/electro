package com.electro.repository.general;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
@Slf4j
public class InMemoryEmitterRepository implements EmitterRepository {

    private final Map<String, String> uuidEmitterMap = new ConcurrentHashMap<>();
    private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    @Override
    public void addOrReplaceEmitter(String uuid, String uniqueKey, SseEmitter emitter) {
        uuidEmitterMap.put(uuid, uniqueKey);
        emitterMap.put(uniqueKey, emitter);
    }

    @Override
    public void remove(String uniqueKey) {
        if (emitterMap.containsKey(uniqueKey)) {
            log.debug("Removing emitter for key: {}", uniqueKey);
            uuidEmitterMap.values().remove(uniqueKey);
            emitterMap.remove(uniqueKey);
        } else {
            log.debug("No emitter to remove for key: {}", uniqueKey);
        }
    }

    @Override
    public Optional<SseEmitter> getByUniqueKey(String uniqueKey) {
        return Optional.ofNullable(emitterMap.get(uniqueKey));
    }

    @Override
    public Optional<SseEmitter> getByUuid(String uuid) {
        return Optional.ofNullable(uuidEmitterMap.get(uuid)).map(emitterMap::get);
    }

    @Override
    public String getUuidByUniqueKey(String uniqueKey) {
        return uuidEmitterMap
                .entrySet()
                .stream()
                .filter(entry -> Objects.equals(entry.getValue(), uniqueKey))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElseThrow(() -> new RuntimeException(String.format("Cannot get emitter UUID by key: %s", uniqueKey)));
    }

}
