package io.finsight.finsightapi.service;

import org.springframework.stereotype.Service;

import io.finsight.finsightapi.model.User;

@Service
public class UserService {
    public User createUser(User user) {
        if (getUser(user.getUsername()) == null) {
            return new User();
        } else {
            return null;
        }
    }

    public User getUser(String username) {
        return null;
    }
}