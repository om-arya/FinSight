package io.finsight.finsightapi.model.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {
    
    @Id
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String emailAddress;
    
    private List<String> heldTickers;
    private List<Integer> heldAmounts;
    private List<Double> heldProfits;
}
