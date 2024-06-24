package io.finsight.finsightapi.repository;

import org.springframework.data.repository.CrudRepository;

import io.finsight.finsightapi.model.User;

public interface UserRepository extends CrudRepository<User, String> {
    
}
