package com.abdo.postms.services;

import com.abdo.postms.dto.PostResponse;
import com.abdo.postms.entities.Post;
import com.abdo.postms.exceptions.ResourceNotFoundException;
import com.abdo.postms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private  PostRepository postRepository;
    // Add methods to handle business logic related to posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    public Post getPostById(Long id) {
        return postRepository.findById(id) .orElseThrow(() -> new ResourceNotFoundException(
                "customer with id [%s] not found".formatted(id)
        ));

    }
    public List<Post> getPostsByUser(Long userId){
        List<Post>posts =postRepository.findByUserId(userId);
        return posts;
    }
    public Post savePost(Post post) {
        return postRepository.save(post);
    }
    public void deletePostById(Long id) {

        postRepository.deleteById(id);
    }
    // Add additional methods based on your application's requirements
}
