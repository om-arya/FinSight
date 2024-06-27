package io.finsight.finsightapi.model.dto;

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
    
    // Keep track of asset purchases, separated by date for
    // accurate statistical displays
    private String[] purchaseNames;
    private Integer[] purchaseAmounts;
    private String[] purchaseDates;
}
