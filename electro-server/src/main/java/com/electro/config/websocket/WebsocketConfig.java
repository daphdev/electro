package com.electro.config.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    // setApplicationDestinationPrefixes("/app"): Gửi tin nhắn lên với đường dẫn /app/...
    // topic là nơi nhắn message với đường dẫn bắt đầu là /topic/...
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/chat/send");
        registry.enableSimpleBroker("/chat/receive");
    }

    // Đường dẫn /app-chat để connect vào WebSocket
    // setAllowedOriginPatterns("*") là các đường dẫn tất cả URL host có thể connect được
    // Dùng thư viện socketjs để connect
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

}
