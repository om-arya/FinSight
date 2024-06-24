package io.finsight.finsightapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.finsight.finsightapi.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
}
