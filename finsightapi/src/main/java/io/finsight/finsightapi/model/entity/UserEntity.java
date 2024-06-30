package io.finsight.finsightapi.model.entity;

import io.finsight.finsightapi.model.Transaction;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    private String username;
    private String password;

    private String firstName;
    private String lastName;

    private String emailAddress;
    
    @ElementCollection
    private Transaction[] transactions;
}
