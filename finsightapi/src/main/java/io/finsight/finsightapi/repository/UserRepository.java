package io.finsight.finsightapi.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.finsight.finsightapi.model.entity.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, String> {
    Optional<UserEntity> findByEmailAddress(String emailAddress); // used for getUserByEmailAddress() service
}
