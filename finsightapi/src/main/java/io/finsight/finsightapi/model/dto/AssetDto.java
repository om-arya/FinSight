package io.finsight.finsightapi.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetDto {
    private String name;

    private String ticker;

    private String type;

    private String color;
    
    private Double[] prices;
}
