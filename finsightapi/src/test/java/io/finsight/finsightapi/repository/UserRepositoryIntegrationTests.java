package io.finsight.finsightapi.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import io.finsight.finsightapi.TestDataUtil;
import io.finsight.finsightapi.model.User;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserRepositoryIntegrationTests {
    private UserRepository underTest;

    @Autowired
    public UserRepositoryIntegrationTests(UserRepository underTest) {
        this.underTest = underTest;
    }

    @Test
    public void testUserCreateAndRecall() {
        User user = TestDataUtil.createTestUserA();
        underTest.save(user);
        Optional<User> result = underTest.findById(user.getUsername());
        assertTrue((result).isPresent());
        assertTrue((result.get()).equals(user));
    }
}