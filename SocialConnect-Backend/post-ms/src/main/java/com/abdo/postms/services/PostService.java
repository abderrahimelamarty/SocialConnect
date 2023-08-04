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
    public Post likePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() ->
                new ResourceNotFoundException("Post with ID " + postId + " not found")
        );

        // Increment the like count for the post
        post.setLikes(post.getLikes() + 1);

        // Save the updated post in the database
        return postRepository.save(post);
    }
    public String deletePostById(Long id)  {

        postRepository.deleteById(id);
        return "Post deleted ";
    }
    // Add additional methods based on your application's requirements
}
