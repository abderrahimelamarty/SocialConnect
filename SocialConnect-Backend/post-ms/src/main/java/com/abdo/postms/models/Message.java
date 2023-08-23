package com.abdo.postms.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Message {
    private String content;
    private Long senderId;
    private Long receiverId;
}
