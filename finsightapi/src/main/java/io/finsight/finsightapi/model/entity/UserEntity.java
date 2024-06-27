package io.finsight.finsightapi.model.entity;

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
    
    // Keep track of asset purchases, separated by date for
    // accurate statistical displays
    private String[] purchaseNames;
    private Integer[] purchaseAmounts;
    private String[] purchaseDates;
}
