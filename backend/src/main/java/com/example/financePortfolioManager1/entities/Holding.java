package com.example.financePortfolioManager1.entities;

import jakarta.persistence.*;

@Entity
public class Holding {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true)
    private String ticker;

    private double volume;

    private double received;

    private double spent;

    public double getReceived() {
        return received;
    }

    public void setReceived(double received) {
        this.received = received;
    }

    public double getSpent() {
        return spent;
    }

    public void setSpent(double spent) {
        this.spent = spent;
    }

    public Holding() {
    }

    @Override
    public String toString() {
        return "MyPortfolioHolding{" +
                "id=" + id +
                ", ticker=" + ticker +
                ", volume=" + volume +
                ", received=" + received +
                ", spent=" + spent +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public double getVolume() {
        return volume;
    }

    public void setVolume(double volume) {
        this.volume = volume;
    }
}
