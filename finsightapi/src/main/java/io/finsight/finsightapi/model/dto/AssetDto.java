package io.finsight.finsightapi.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetDto {
    private String ticker;

    private String name;

    private String exchange;

    private String sector;
    
    private Double[] prices;
}
