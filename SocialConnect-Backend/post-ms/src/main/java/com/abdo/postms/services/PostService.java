package com.abdo.postms.services;

import com.abdo.postms.dto.PostResponse;
import com.abdo.postms.entities.Comment;
import com.abdo.postms.entities.Post;
import com.abdo.postms.exceptions.ResourceNotFoundException;
import com.abdo.postms.models.Like;
import com.abdo.postms.repositories.CommentRepository;
import com.abdo.postms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private  PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    // Add methods to handle business logic related to posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    public Post getPostById(Long id) {
        return postRepository.findById(id) .orElseThrow(() -> new ResourceNotFoundException(
                "post with id [%s] not found".formatted(id)
        ));

    }
//    public Post addCommentToPost(Long postId, Comment comment) {
//        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException(
//                "post with id [%s] not found".formatted(postId)
//        ));
//
//
//            comment.setPostId(postId);
//            Comment savedComment = commentRepository.save(comment);
//            post.getComments().add(savedComment);
//            return postRepository.save(post);
//
//    }
    public List<Post> getPostsByUser(Long userId){
        List<Post>posts =postRepository.findByUserId(userId);
        return posts;
    }
    public Post savePost(Post post) {
      post.setTimestamp(LocalDateTime.now());
        post.setLikes(new ArrayList<>());
        post.setComments(new ArrayList<>());
              return   postRepository.save(post);
    }
    public Post updatePost(Post post) {
        List<Comment> comments = commentRepository.findByPostId(post.getId());
        post.setComments(comments);
        return   postRepository.save(post);
    }
    public Post likePost(Long postId,Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() ->
                new ResourceNotFoundException("Post with ID " + postId + " not found")
        );


        List<Long> likes = post.getLikes();
        if (likes == null) {
            likes = new ArrayList<>();
        }
        likes.add(userId);
        post.setLikes(likes);
        // Save the updated post in the database
        return postRepository.save(post);
    }

    public Post dislikePost(Long postId,Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() ->
                new ResourceNotFoundException("Post with ID " + postId + " not found")
        );

        // Increment the like count for the post
        List<Long> likes = post.getLikes();

        likes.remove(userId);
        post.setLikes(likes);
        // Save the updated post in the database
        return postRepository.save(post);
    }
    public String deletePostById(Long id)  {

        postRepository.deleteById(id);
        return "Post deleted ";
    }
    // Add additional methods based on your application's requirements
}
