package com.abdo.postms.entities;

import com.abdo.postms.models.Like;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    private Long userId;
    private String text;
    private String image;
    private LocalDateTime timestamp;
    @Column(length = 65555)
    private List<Long> likes;
    @OneToMany(mappedBy="postId")
    private List<Comment> comments;
}
