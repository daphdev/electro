package com.electro.config;

import io.github.perplexhub.rsql.RSQLCommonSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;

@Configuration
public class ApplicationConfig {

    @Bean
    public RSQLCommonSupport rsqlConfiguration(RSQLCommonSupport rsqlCommonSupport) {
        RSQLCommonSupport.addConverter(Instant.class, s -> {
            try {
                return Instant.parse(s);
            } catch (Exception e) {
                return null;
            }
        });
        return rsqlCommonSupport;
    }

}
