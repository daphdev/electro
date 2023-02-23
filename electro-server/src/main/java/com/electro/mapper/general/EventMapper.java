package com.electro.mapper.general;

import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@AllArgsConstructor
public class EventMapper {

    public SseEmitter.SseEventBuilder toSseEventBuilder(String eventName, Object eventData) {
        return SseEmitter.event()
                .id(RandomStringUtils.randomAlphanumeric(12))
                .name(eventName)
                .data(eventData);
    }

}
