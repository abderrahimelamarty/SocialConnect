package com.abdo.postms.repositories;

import java.util.List;

import com.abdo.postms.entities.Comment;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);

    @Transactional
    void deleteByPostId(long PostId);
}