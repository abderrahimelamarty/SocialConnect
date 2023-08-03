package com.abdo.postms.repositories;

import com.abdo.postms.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Add custom query methods if needed
    List<Post> findByUserId(Long userId);
}
