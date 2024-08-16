package com.example.financePortfolioManager1.services;

import com.example.financePortfolioManager1.entities.Holding;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface HoldingService {

    public Holding savePortfolio(Holding holding);

    public List<Holding> getAllHoldings();

    public Holding findByTicker(String ticker);

    public Holding updatePortfolio(String ticker, double volume, double received, double spent);



}
