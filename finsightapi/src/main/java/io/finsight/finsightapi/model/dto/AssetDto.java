package io.finsight.finsightapi.model.dto;

import java.util.List;

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
    
    private List<Double> prices;
}
