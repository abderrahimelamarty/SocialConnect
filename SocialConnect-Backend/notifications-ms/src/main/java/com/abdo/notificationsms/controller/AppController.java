package com.abdo.notificationsms.controller;

import com.abdo.notificationsms.dto.ChatBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class AppController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/private-message")
    public ChatBody privateChat(@Payload ChatBody chatBody) {
        simpMessagingTemplate.convertAndSendToUser(
                chatBody.getReceiverName(),
                "/private",
                chatBody
        );
        return chatBody;
    }

    @MessageMapping("/message")
    @SendTo("/group/public")
    public ChatBody pubicChat(@Payload ChatBody chatBody) {
        return chatBody;
    }
}