package com.example.financePortfolioManager1.services;

import com.example.financePortfolioManager1.entities.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface StockService {


    public Stock saveStock(Stock stock);

    public List<Stock> getAllStocks();

    public Stock updateStock(Long id, String ticker, String market);

    public void deleteStock(Long id);

    public Stock findByticker(String ticker);
    public Stock getStockData(String ticker);
}

