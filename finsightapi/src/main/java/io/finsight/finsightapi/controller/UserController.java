package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.UserService;
import io.finsight.finsightapi.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/users")
    public User createUser(@RequestBody final User user) {
        return userService.createUser(user);
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(path = "/users")
    public User getUser() {
        return User.builder()
                .username("bobfinancebro")
                .password("password123")
                .firstName("Bob")
                .lastName("Robertson")
                .emailAddress("boblikesdonuts@gmail.com")
                .assetNames(new ArrayList<>(Arrays.asList("Google", "Meta", "Amazon")))
                .assetAmounts(new ArrayList<>(Arrays.asList(12, 7, 9)))
                .build();
    }

}