package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.UserService;
import io.finsight.finsightapi.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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
    public User getUser(@RequestBody User user) {
        return userService.createUser(user);
    }

}