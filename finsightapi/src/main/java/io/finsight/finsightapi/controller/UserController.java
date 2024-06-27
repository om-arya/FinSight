package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.UserOperationStatus;
import io.finsight.finsightapi.service.UserService;
import io.finsight.finsightapi.model.dto.UserDto;
import io.finsight.finsightapi.model.entity.UserEntity;
import io.finsight.finsightapi.model.mapper.Mapper;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
public class UserController {
    private UserService userService;
    private Mapper<UserEntity, UserDto> userMapper;

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(path = "/users")
    public ResponseEntity<UserOperationStatus> createUser(@RequestBody UserDto userDto) {
        UserEntity userEntity = userMapper.mapFrom(userDto);
        return userService.createUser(userEntity);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping(path = "/users")
    public ResponseEntity<Void> deleteUser(@RequestBody String username) {
        return userService.deleteUserByUsername(username);
    }
}