package com.example.financePortfolioManager1.repo;

import com.example.financePortfolioManager1.entities.Holding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoldingRepo extends JpaRepository<Holding, Integer> {

    public Holding findByTicker(String ticker);
}
