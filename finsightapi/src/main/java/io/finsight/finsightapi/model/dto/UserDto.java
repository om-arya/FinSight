package io.finsight.finsightapi.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String emailAddress;

    private List<String> heldTickers;
    private List<Integer> heldAmounts;
    private List<Double> heldProfits;
}
