package com.electro.config.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    //setApplicationDestinationPrefixes("/app"): la gui tin nhan len voi duong dan /app/...
    //topic la noi nhan message voi duong dan bat dau la /topic/...
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/chat/sent");
        registry.enableSimpleBroker("/chat/receive");

    }

    // duong dan /app-chat de connect vao socket.
    // setAllowedOriginPatterns("*")  la cac duong dan tat ca url host co the connect duoc.
    // dung thu vien socketjs de connect
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

}
