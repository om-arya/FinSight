package io.finsight.finsightapi.model;

import java.util.Map;

import jakarta.persistence.Entity;
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
    String username;
    String password;

    String name;
    String emailAddress;
    Map<String, Integer> assets;
}
