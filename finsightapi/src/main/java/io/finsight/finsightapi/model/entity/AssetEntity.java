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
@Table(name = "assets")
public class AssetEntity {

    @Id
    private String ticker;
    private String name;
    private String exchange;
    private String sector;
    
    private List<Double> prices;
}