package com.example.financePortfolioManager1.repo;

import com.example.financePortfolioManager1.entities.Transaction;
import com.example.financePortfolioManager1.services.TransactionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer>
{

    public List<Transaction> findAllByTicker(String ticker);

    public List<Transaction> findAllByType(TransactionService.TransactionType type);

    public Transaction findFirstByOrderByIdDesc();
}
