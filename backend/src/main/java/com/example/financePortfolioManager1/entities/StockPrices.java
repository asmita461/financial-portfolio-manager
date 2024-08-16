package com.example.financePortfolioManager1.entities;



import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class StockPrices {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Override
    public String toString() {
        return "StockPrices{" +
                "id=" + id +
                ", createdAt=" + timestamp_ +
                ", lowPrice=" + low +
                ", highPrice=" + high +
                '}';
    }

    @OneToOne
    private Stock stock;

    private LocalDateTime timestamp_ ;

    private List<Double> low;

    private List<Double> high;

    private List<Double> open;

    private List<Double> close;

    public StockPrices() {
    }

    public List<Double> getLow() {
        return low;
    }

    public void setLow(List<Double> low) {
        this.low = low;
    }

    public List<Double> getHigh() {
        return high;
    }

    public void setHigh(List<Double> high) {
        this.high = high;
    }

    public List<Double> getOpen() {
        return open;
    }

    public void setOpen(List<Double> open) {
        this.open = open;
    }

    public List<Double> getClose() {
        return close;
    }

    public void setClose(List<Double> close) {
        this.close = close;
    }

    public StockPrices(Long id, Stock stock, LocalDateTime timestamp_, List<Double> low, List<Double> high, List<Double> open, List<Double> close) {
        this.id = id;
        this.stock = stock;
        this.timestamp_ = timestamp_;
        this.low = low;
        this.high = high;
        this.open = open;
        this.close = close;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public LocalDateTime getTimestamp_() {
        return timestamp_;
    }

    public void setTimestamp_(LocalDateTime timestamp_) {
        this.timestamp_ = timestamp_;
    }



}
