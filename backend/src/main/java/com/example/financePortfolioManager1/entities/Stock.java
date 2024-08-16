package com.example.financePortfolioManager1.entities;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;


@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Ticker cannot be null")
    private String ticker;

    private String market;


    @OneToOne(cascade=CascadeType.ALL)
    private StockPrices price_data;

    public StockPrices getPrice_data() {
        return price_data;
    }

    public void setPrice_data(StockPrices price_data) {
        this.price_data = price_data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {

        this.id = id;

    }

    @NotBlank(message = "Sticker cannot be null")
    public String getTicker() {
        return ticker;
    }

    @NotBlank(message = "Sticker cannot be null")
    public void setTicker( String ticker) {
        this.ticker = ticker;
    }

    public String getMarket() {
        return market;
    }

    public void setMarket(String market) {
        this.market = market;
    }


    @Override
    public String toString() {
        return "Stock{" +
                "id=" + id +
                ", ticker='" + ticker + '\'' +
                ", market='" + market + '\'' +
                '}';
    }

    public Stock() {
    }

    public Stock(Long id, String ticker, String market, StockPrices price_data) {
        this.id = id;
        this.ticker = ticker;
        this.market = market;
        this.price_data = price_data;
    }
}

