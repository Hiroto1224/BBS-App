package com.backend.util;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@org.springframework.context.annotation.Configuration
public class Configuration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://agreeable-bush-0c0d76200-31.eastasia.3.azurestaticapps.net")
                        .allowedMethods("GET", "POST", "PUT", "DELETE","OPTION")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
