package com.backend.util;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        System.out.println("websocket");
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000","https://agreeable-bush-0c0d76200-38.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-39.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-40.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-41.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-42.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-43.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-44.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-45.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-46.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-47.eastasia.3.azurestaticapps.net"
                        )
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }


}
