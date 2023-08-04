package com.abdo.postms.controllers;

import com.abdo.postms.entities.Post;
import com.abdo.postms.exceptions.ResourceNotFoundException;
import com.abdo.postms.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/posts")

public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }



    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {

        return postService.savePost(post);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post) {
        Post existingPost = postService.getPostById(id);
        if (existingPost != null) {
            // Update the existing post with the new data
            existingPost.setText(post.getText());
            existingPost.setImage(post.getImage());
            // Update other fields as needed
            return postService.savePost(existingPost);
        }
        return null;
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId) {
       return ResponseEntity.ok(postService.likePost(postId));
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePostById(id);
    }

    // Add additional methods based on your application's requirements
}
