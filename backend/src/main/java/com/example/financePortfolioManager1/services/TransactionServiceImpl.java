package com.example.financePortfolioManager1.services;

import com.example.financePortfolioManager1.entities.Transaction;
import com.example.financePortfolioManager1.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements  TransactionService{

    @Autowired
    private TransactionRepo transactionRepo;


    public List<Transaction> getAllTransactions(){
        return transactionRepo.findAll();
    }

    public Transaction addTransaction(Transaction transaction){
        return transactionRepo.save(transaction);
    };

    public List<Transaction> findAllByTicker(String ticker){
        return transactionRepo.findAllByTicker(ticker);
    }

    public List<Transaction> findAllByType(TransactionService.TransactionType type){
        return transactionRepo.findAllByType(type);
    }

    public double getBalance(){
        if(transactionRepo.findFirstByOrderByIdDesc() == null){
            return 0;
        }
        else
            return (transactionRepo.findFirstByOrderByIdDesc()).getNetTrans();
    };

}
