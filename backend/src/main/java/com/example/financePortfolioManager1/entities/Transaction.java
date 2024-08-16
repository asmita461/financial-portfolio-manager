package com.example.financePortfolioManager1.entities;

import com.example.financePortfolioManager1.services.TransactionService;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String ticker;
    private double volume;
    private double price;
    private LocalDateTime timeOfTransaction;
    public TransactionService.TransactionType type;
    public double netTrans;

    public Transaction() {
    }

    public long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "MyTransaction{" +
                "id=" + id +
                ", ticker='" + ticker + '\'' +
                ", volume=" + volume +
                ", price=" + price +
                ", timeOfTransaction=" + timeOfTransaction +
                ", type=" + type +
                ", balance=" + netTrans +
                '}';
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getTimeOfTransaction() {
        return timeOfTransaction;
    }

    public void setTimeOfTransaction(LocalDateTime timeOfTransaction) {
        this.timeOfTransaction = timeOfTransaction;
    }

    public TransactionService.TransactionType getType() {
        return type;
    }

    public void setType(TransactionService.TransactionType type) {
        this.type = type;
    }

    public double getNetTrans() {
        return netTrans;
    }

    public void setNetTrans(double netTrans) {
        this.netTrans = netTrans;
    }
}

