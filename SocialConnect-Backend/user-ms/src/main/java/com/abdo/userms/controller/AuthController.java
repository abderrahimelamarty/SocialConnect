package com.abdo.userms.controller;

import com.abdo.userms.config.CustomUserDetails;
import com.abdo.userms.dto.AuthRequest;
import com.abdo.userms.dto.LoginResponse;
import com.abdo.userms.entity.UserCredential;
import com.abdo.userms.service.AuthService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin( "http://localhost:3000/")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserCredential user) {
        return service.saveUser(user);
    }

    @PostMapping("/token")
    public ResponseEntity<LoginResponse> getToken(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        CustomUserDetails user= (CustomUserDetails) authenticate.getPrincipal();
        if (authenticate.isAuthenticated()) {
            String token = service.generateToken(authRequest.getUsername());
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(token);
            loginResponse.setName(user.getUsername());
            // Assuming you have user details in the 'user' object
            loginResponse.setEmail(user.getEmail());
            loginResponse.setId(user.getId());
          return new ResponseEntity<>(loginResponse, HttpStatus.OK) ;
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }
}