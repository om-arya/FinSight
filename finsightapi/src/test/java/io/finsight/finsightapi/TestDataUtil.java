package io.finsight.finsightapi;

import java.util.ArrayList;
import java.util.Arrays;

import io.finsight.finsightapi.model.User;

public class TestDataUtil {
    public static User createTestUserA() {
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
