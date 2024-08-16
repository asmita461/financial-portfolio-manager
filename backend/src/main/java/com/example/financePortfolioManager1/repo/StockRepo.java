package com.example.financePortfolioManager1.repo;
import java.util.*;
import com.example.financePortfolioManager1.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepo extends JpaRepository<Stock, Long> {


    public Stock findByticker(String ticker);
}
