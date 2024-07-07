package io.finsight.finsightapi.controller;

import io.finsight.finsightapi.service.UserOperationStatus;
import io.finsight.finsightapi.service.UserService;
import io.finsight.finsightapi.model.dto.HoldingDto;
import io.finsight.finsightapi.model.dto.UserDto;
import io.finsight.finsightapi.model.entity.HoldingEntity;
import io.finsight.finsightapi.model.entity.UserEntity;
import io.finsight.finsightapi.model.mapper.Mapper;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    private UserService userService;
    private Mapper<UserEntity, UserDto> userMapper;
    private Mapper<HoldingEntity, HoldingDto> holdingMapper;

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper, Mapper<HoldingEntity, HoldingDto> holdingMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.holdingMapper = holdingMapper;
    }
    
    /* CREATE ENDPOINTS */

    /**
     * Create a new user to save into the database. If a user with this
     * username or emailAddress already exists, the service returns a
     * CONFLICT custom operation status (with an OK HTTP status).
     * 
     * @param userDto to save as a UserEntity into the database.
     * @return a ResponseEntity consisting of a custom status to
     *         differentiate username and email address conflicts, along
     *         with an HTTP status.
     */
    @PostMapping(path = "/users")
    public ResponseEntity<UserOperationStatus> createUser(@RequestBody UserDto userDto) {
        UserEntity userEntity = userMapper.mapFrom(userDto);
        return userService.createUser(userEntity);
    }

    /* READ ENDPOINTS */

    /**
     * Get the user from the database with the specified username. If the
     * user does not exist, the service returns an empty body.
     * 
     * @param username of the user to get from the database.
     * @return a ResponseEntity consisting of a user DTO, which is empty
     *         if not found, along with an HTTP status.
     */
    @GetMapping(path = "/users/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        ResponseEntity<Optional<UserEntity>> responseEntity = userService.getUserByUsername(username);

        Optional<UserEntity> optionalUserEntity = responseEntity.getBody();
        UserEntity userEntity = optionalUserEntity != null && optionalUserEntity.isPresent() ? optionalUserEntity.get() : null;

        UserDto userDto = userEntity != null ? userMapper.mapTo(userEntity) : null;
        return new ResponseEntity<>(userDto, responseEntity.getStatusCode());
    }

    /**
     * Get the user from the database with the specified email address. If
     * the user does not exist, the service returns an empty body.
     * 
     * @param emailAddress of the user to get from the database.
     * @return a ResponseEntity consisting of a user DTO, which is empty
     *         if not found, along with an HTTP status.
     */
    @GetMapping(path = "/users/emailaddress")
    public ResponseEntity<UserDto> getUserByEmailAddress(@RequestParam String emailAddress) {
        ResponseEntity<Optional<UserEntity>> responseEntity = userService.getUserByEmailAddress(emailAddress);

        Optional<UserEntity> optionalUserEntity = responseEntity.getBody();
        UserEntity userEntity = optionalUserEntity != null && optionalUserEntity.isPresent() ? optionalUserEntity.get() : null;

        UserDto userDto = userEntity != null ? userMapper.mapTo(userEntity) : null;
        return new ResponseEntity<>(userDto, responseEntity.getStatusCode());
    }

    /* UPDATE ENDPOINTS */

    /**
     * Update the firstName of the user who has the specified username. If
     * the user does not exist, the service returns a NOT_FOUND status.
     * 
     * @param username of the user to update the firstName of.
     * @param newFirstName to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/users/firstname/{username}")
    public ResponseEntity<Void> setUserFirstName(@PathVariable String username, @RequestParam String newFirstName) {
        return userService.setUserFirstName(username, newFirstName);
    }

    /**
     * Update the lastName of the user who has the specified username. If
     * the user does not exist, the service returns a NOT_FOUND status.
     * 
     * @param username of the user to update the lastName of.
     * @param newLastName to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/users/lastname/{username}")
    public ResponseEntity<Void> setUserLastName(@PathVariable String username, @RequestParam String newLastName) {
        return userService.setUserLastName(username, newLastName);
    }

    /**
     * Update the emailAddress of the user who has the specified username. If
     * the user does not exist, the service returns a NOT_FOUND status.
     * 
     * @param username of the user to update the emailAddress of.
     * @param newEmailAddress to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/users/emailaddress/{username}")
    public ResponseEntity<Void> setUserEmailAddress(@PathVariable String username, @RequestParam String newEmailAddress) {
        return userService.setUserEmailAddress(username, newEmailAddress);
    }

    /**
     * Update the password of the user who has the specified username. If
     * the user does not exist, the service returns a NOT_FOUND status.
     * 
     * @param username of the user to update the password of.
     * @param newPassword to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/users/password/{username}")
    public ResponseEntity<Void> setUserPassword(@PathVariable String username, @RequestParam String newPassword) {
        return userService.setUserPassword(username, newPassword);
    }

    /**
     * Update the holdings of the user who has the specified username. If
     * the user does not exist, the service returns a NOT_FOUND status.
     * 
     * @param username of the user to update the holdings of.
     * @param newHoldings to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @PatchMapping(path = "/users/holdings/{username}")
    public ResponseEntity<Void> setUserHoldings(@PathVariable String username, @RequestBody List<HoldingDto> newHoldingDtos) {
        List<HoldingEntity> newHoldingEntities = new ArrayList<HoldingEntity>();
        for (HoldingDto holdingDto : newHoldingDtos) {
            newHoldingEntities.add(holdingMapper.mapFrom(holdingDto));
        }
        
        return userService.setUserHoldings(username, newHoldingEntities);
    }

    /* DELETE ENDPOINTS */

    /**
     * Delete the user with the specified username from the database. If
     * the user does not exist, it is silently ignored.
     * 
     * @param username of the user to delete from the database.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    @DeleteMapping(path = "/users/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        return userService.deleteUser(username);
    }
}