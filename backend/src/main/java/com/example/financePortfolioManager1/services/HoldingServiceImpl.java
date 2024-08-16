package com.example.financePortfolioManager1.services;

import com.example.financePortfolioManager1.entities.Holding;
import com.example.financePortfolioManager1.repo.HoldingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoldingServiceImpl implements HoldingService{

    @Autowired
    private HoldingRepo holdingRepo;

    @Override
    public Holding savePortfolio(Holding holding) {
        return holdingRepo.save(holding);
    }

    @Override
    public List<Holding> getAllHoldings() {
        return holdingRepo.findAll();
    }

    @Override
    public Holding findByTicker(String ticker){ return holdingRepo.findByTicker(ticker); }

    @Override
    public Holding updatePortfolio(String ticker, double volume, double received, double spent) {
        Holding h = holdingRepo.findByTicker(ticker);
        double v = h.getVolume();
        double r = h.getReceived() ;
        double s = h.getSpent();

        if (v+volume >= 0) {
            h.setVolume(v + volume);
            h.setReceived(r+received);
            h.setSpent(s+spent);
            holdingRepo.save(h);
            return h;
        }
        else
            return null;

    }



}
