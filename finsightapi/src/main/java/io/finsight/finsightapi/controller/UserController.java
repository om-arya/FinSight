package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.UserService;
import io.finsight.finsightapi.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping(path = "/users")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    
    @GetMapping(path = "/users")
    public User getUser() {
        return User.builder()
                .username("bobfinancebro")
                .password("password123")
                .name("Bob Robertson")
                .emailAddress("boblikesdonuts@gmail.com")
                .assetNames(new ArrayList<>(Arrays.asList("Google", "Meta", "Amazon")))
                .assetAmounts(new ArrayList<>(Arrays.asList(12, 7, 9)))
                .build();
    }

}