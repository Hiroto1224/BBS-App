package com.backend.util;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","https://agreeable-bush-0c0d76200-31.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-32.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-33.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-34.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-35.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-36.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-37.eastasia.3.azurestaticapps.net",
                        "https://agreeable-bush-0c0d76200-38.eastasia.3.azurestaticapps.net","https://agreeable-bush-0c0d76200-39.eastasia.3.azurestaticapps.net")
                .allowCredentials(true);
    }
}