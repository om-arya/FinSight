package io.finsight.finsightapi.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.finsight.finsightapi.model.entity.UserEntity;
import io.finsight.finsightapi.repository.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /* CREATE OPERATIONS */

    /**
     * Create a new user to save into the database. If a user with this
     * username or emailAddress already exists, return a CONFLICT status.
     * 
     * @param user to save into the database.
     * @return a ResponseEntity consisting of a custom status to
     *         differentiate username and email address conflicts, along
     *         with an HTTP status.
     */
    public ResponseEntity<UserOperationStatus> createUser(UserEntity user) {
        ResponseEntity<Optional<UserEntity>> userByUsernameResponseEntity = getUserByUsername(user.getUsername());
        ResponseEntity<Optional<UserEntity>> userByEmailAddressResponseEntity = getUserByEmailAddress(user.getEmailAddress());

        if (userByUsernameResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR
            || userByEmailAddressResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(UserOperationStatus.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR); 
        }

        Optional<UserEntity> userOptional = userByUsernameResponseEntity.getBody();
        if (userOptional != null && userOptional.isPresent()) {
            return new ResponseEntity<>(UserOperationStatus.USERNAME_CONFLICT, HttpStatus.OK);
        }
        
        userOptional = userByEmailAddressResponseEntity.getBody();
        if (userOptional != null && userOptional.isPresent()) {
            return new ResponseEntity<>(UserOperationStatus.EMAIL_ADDRESS_CONFLICT, HttpStatus.OK);
        }

        try {
            userRepository.save(user);
            return new ResponseEntity<>(UserOperationStatus.OK, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(UserOperationStatus.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* READ OPERATIONS */

    /**
     * Get the user from the database with the specified username. If the
     * user does not exist, return a NOT_FOUND status.
     * 
     * @param username of the user to get from the database.
     * @return a ResponseEntity consisting of an (optional) user, which is
     *         empty if not found, along with an HTTP status.
     */
    public ResponseEntity<Optional<UserEntity>> getUserByUsername(String username) {
        try {
            Optional<UserEntity> user = userRepository.findById(username);
            if (user.isEmpty()) {
                return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the user from the database with the specified emailAddress. If
     * the user does not exist, return a NOT_FOUND status.
     * 
     * @param emailAddress of the user to get from the database.
     * @return a ResponseEntity consisting of an (optional) user, which is
     *         empty if not found, along with an HTTP status.
     */
    public ResponseEntity<Optional<UserEntity>> getUserByEmailAddress(String emailAddress) {
        try {
            Optional<UserEntity> user = userRepository.findByEmailAddress(emailAddress);
            if (user.isEmpty()) {
                return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* UPDATE OPERATIONS */

    /**
     * Update the firstName of the user who has the specified username. If
     * the user does not exist, return a NOT_FOUND status.
     * 
     * @param username of the user to update the firstName of.
     * @param newFirstName to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> setUserFirstName(String username, String newFirstName) {
        ResponseEntity<Optional<UserEntity>> userResponseEntity = getUserByUsername(username);
        if (userResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Optional<UserEntity> optionalUser = userResponseEntity.getBody();
        if (optionalUser == null || optionalUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }

        UserEntity user = optionalUser.get();
        try {
            user.setFirstName(newFirstName);
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the lastName of the user who has the specified username. If
     * the user does not exist, return a NOT_FOUND status.
     * 
     * @param username of the user to update the lastName of.
     * @param newLastName to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> setUserLastName(String username, String newLastName) {
        ResponseEntity<Optional<UserEntity>> userResponseEntity = getUserByUsername(username);
        if (userResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Optional<UserEntity> optionalUser = userResponseEntity.getBody();
        if (optionalUser == null || optionalUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }

        UserEntity user = optionalUser.get();
        try {
            user.setLastName(newLastName);
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the emailAddress of the user who has the specified username.
     * If the user does not exist, return a NOT_FOUND status.
     * 
     * @param username of the user to update the emailAddress of.
     * @param newEmailAddress to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> setUserEmailAddress(String username, String newEmailAddress) {
        ResponseEntity<Optional<UserEntity>> userResponseEntity = getUserByUsername(username);
        if (userResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Optional<UserEntity> optionalUser = userResponseEntity.getBody();
        if (optionalUser == null || optionalUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }

        UserEntity user = optionalUser.get();
        try {
            user.setEmailAddress(newEmailAddress);
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the password of the user who has the specified username. If
     * the user does not exist, return a NOT_FOUND status.
     * 
     * @param username of the user to update the password of.
     * @param newPassword to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> setUserPassword(String username, String newPassword) {
        ResponseEntity<Optional<UserEntity>> userResponseEntity = getUserByUsername(username);
        if (userResponseEntity.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Optional<UserEntity> optionalUser = userResponseEntity.getBody();
        if (optionalUser == null || optionalUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }

        UserEntity user = optionalUser.get();
        try {
            user.setPassword(newPassword);
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* DELETE OPERATIONS */

    /**
     * Delete the user with the specified username from the database. If
     * the user does not exist, it is silently ignored.
     * 
     * @param username of the user to delete from the database.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    public ResponseEntity<Void> deleteUserByUsername(String username) {
        try {
            userRepository.deleteById(username); // silently ignored if not found
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}