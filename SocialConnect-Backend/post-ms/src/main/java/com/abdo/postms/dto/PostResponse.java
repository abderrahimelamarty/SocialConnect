package com.abdo.postms.dto;

import java.time.LocalDateTime;

public class PostResponse {
    private Long id;
    private String userId;
    private String text;
    private String Author;
    private String image;
    private LocalDateTime timestamp;
    private int likes;
    private int comments;
}
