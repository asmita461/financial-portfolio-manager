package com.example.financePortfolioManager1.control;

import com.example.financePortfolioManager1.entities.Transaction;
import com.example.financePortfolioManager1.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction){


        if(transaction.type == TransactionService.TransactionType.BUY){
            transaction.netTrans = transactionService.getBalance() - (transaction.getVolume()* transaction.getPrice());
        }else{
            transaction.netTrans = transactionService.getBalance() + (transaction.getVolume()* transaction.getPrice());
        }



        Transaction newTransaction = transactionService.addTransaction(transaction);

        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Transaction> getTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/ticker/{ticker}")
    public List<Transaction> getByTicker(@PathVariable(required = true) String ticker){
        return transactionService.findAllByTicker(ticker);
    }

    @GetMapping("/type/{type}")
    public List<Transaction> getByType(@PathVariable(required = true) TransactionService.TransactionType type){
        return transactionService.findAllByType(type);
    }

    @GetMapping("/balance")
    public double getNetTrans() {
        return transactionService.getBalance();
    }
}

