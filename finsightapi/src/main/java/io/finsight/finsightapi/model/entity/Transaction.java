package io.finsight.finsightapi.model.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Transaction {
    private String date;
    private String ticker;
    private Integer amount;

    public Transaction(String date, String ticker, Integer amount) {
        this.date = date;
        this.ticker = ticker;
        this.amount = amount;
    }
}
