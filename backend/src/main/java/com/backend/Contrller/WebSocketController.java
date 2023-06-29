package com.backend.Contrller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class WebSocketController {
    private final SimpMessagingTemplate template;

    @Autowired

    public WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }


    @GetMapping("/some-endpoint")
    public ResponseEntity<String> getMethod(@RequestParam String data){
        this.template.convertAndSend("/topic/public","Some Response");
        System.out.println("aaaaaaaaaaaaaaa" + data);
        return ResponseEntity.ok().build();
    }
}

