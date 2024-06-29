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
@Table(name = "assets")
public class AssetEntity {

    @Id
    private String ticker;

    private String name;

    private String exchange;

    private String type;
    
    private Double[] prices;
}