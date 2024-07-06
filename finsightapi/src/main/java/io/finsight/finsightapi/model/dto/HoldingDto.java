package io.finsight.finsightapi.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HoldingDto {
    private String ticker;
    private Integer amount;
    private Double profit;
    private String username;
}
