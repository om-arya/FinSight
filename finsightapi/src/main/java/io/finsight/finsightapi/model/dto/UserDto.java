package io.finsight.finsightapi.model.dto;

import io.finsight.finsightapi.model.Transaction;
import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String password;

    private String firstName;
    private String lastName;

    private String emailAddress;
    
    @ElementCollection
    private Transaction[] transactions;
}
