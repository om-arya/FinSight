package main.java.io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping(path = "/users")
    public User createUser(@RequestBody User user) {
        userService.createUser(user);
    }

}