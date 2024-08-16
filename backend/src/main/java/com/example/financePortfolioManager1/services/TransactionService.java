package com.example.financePortfolioManager1.services;

import com.example.financePortfolioManager1.entities.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TransactionService {

    public enum TransactionType{
        BUY,SELL
    }

    public List<Transaction> getAllTransactions();

    public Transaction addTransaction(Transaction transaction);

    public List<Transaction> findAllByTicker(String ticker);

    public List<Transaction> findAllByType(TransactionType type);

    public double getBalance();

}
