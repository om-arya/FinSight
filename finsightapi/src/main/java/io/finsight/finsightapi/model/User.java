package io.finsight.finsightapi.model;


import java.util.List;

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
public class User {

    @Id
    private String username;
    private String password;

    private String firstName;
    private String lastName;

    private String emailAddress;
    
    private List<String> assetNames;
    private List<Integer> assetAmounts;
}
