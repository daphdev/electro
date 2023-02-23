package com.electro.utils;

import com.fasterxml.jackson.datatype.jsr310.deser.InstantDeserializer;

import java.time.Instant;
import java.time.format.DateTimeFormatter;

// Reference: https://github.com/FasterXML/jackson-datatype-jsr310/blob/master/src/main/java/com/fasterxml/jackson/datatype/jsr310/deser/InstantDeserializer.java#L53
public class DefaultInstantDeserializer extends InstantDeserializer<Instant> {
    public DefaultInstantDeserializer() {
        super(Instant.class, DateTimeFormatter.ISO_INSTANT,
                Instant::from,
                a -> Instant.ofEpochMilli(a.value),
                a -> Instant.ofEpochSecond(a.integer, a.fraction),
                null,
                true);
    }
}
