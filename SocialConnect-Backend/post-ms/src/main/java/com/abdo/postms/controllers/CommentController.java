package com.abdo.postms.controllers;

import java.time.LocalDateTime;
import java.util.List;

import com.abdo.postms.dto.CommentDTO;
import com.abdo.postms.entities.Comment;
import com.abdo.postms.exceptions.ResourceNotFoundException;
import com.abdo.postms.repositories.CommentRepository;
import com.abdo.postms.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
   private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getAllCommentsByTutorialId(@PathVariable(value = "postId") Long tutorialId) {
        if (!postRepository.existsById(tutorialId)) {
            throw new ResourceNotFoundException("Not found Tutorial with id = " + tutorialId);
        }

        List<Comment> comments = commentRepository.findByPostId(tutorialId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> getCommentsByTutorialId(@PathVariable(value = "id") Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Comment with id = " + id));

        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<CommentDTO> createComment(@PathVariable(value = "postId") Long tutorialId,
                                                 @RequestBody Comment commentRequest) {
        Comment comment = postRepository.findById(tutorialId).map(post -> {
            commentRequest.setPost(post);
            commentRequest.setTimestamp(LocalDateTime.now());
            return commentRepository.save(commentRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Tutorial with id = " + tutorialId));
        CommentDTO commentDTO=new CommentDTO();
        commentDTO.setContent(comment.getContent());
        commentDTO.setTimestamp(comment.getTimestamp());
        commentDTO.setPostId(tutorialId);
        commentDTO.setUsername(comment.getUsername());

        return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable("id") long id, @RequestBody Comment commentRequest) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CommentId " + id + "not found"));

        comment.setContent(commentRequest.getContent());

        return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable("id") long id) {
        commentRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> deleteAllCommentsOfTutorial(@PathVariable(value = "postId") Long tutorialId) {
        if (!postRepository.existsById(tutorialId)) {
            throw new ResourceNotFoundException("Not found Tutorial with id = " + tutorialId);
        }

        commentRepository.deleteByPostId(tutorialId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}