package com.example.financePortfolioManager1.services;

import com.example.financePortfolioManager1.entities.Stock;

import com.example.financePortfolioManager1.repo.StockRepo;

import com.example.financePortfolioManager1.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {
    @Autowired
    private StockRepo stockRepo;




    @Override
    public Stock saveStock(Stock stock) {
        return stockRepo.save(stock);
    }

    @Override
    public List<Stock> getAllStocks() {
        return stockRepo.findAll();
    }

    String apiUrl="https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=";
    public Stock getStockData(String ticker){
        RestTemplate restTemplate=new RestTemplate();

        Stock stock=restTemplate.getForObject(apiUrl+ticker, Stock.class);
        System.out.println(stock);
        if(stock!=null){
            Stock existingData= stockRepo.findByticker(ticker);
            if(existingData==null){
                existingData=new Stock();
            }
            existingData.setTicker(ticker);
            existingData.setMarket(ticker);
            existingData.setPrice_data(stock.getPrice_data());
        }
        return stock;
    }

    @Override
    public Stock updateStock(Long id, String ticker, String market) {
        Optional<Stock> s = stockRepo.findById(id);
        Stock st = s.stream().findFirst().orElse(null);
        if(!st.equals(null)) {
            if(ticker != null) {st.setTicker(ticker);}
            if(market != null) {st.setMarket(market);}
            return stockRepo.save(st);
        }
        else {
            return null;
        }
    }

    @Override
    public void deleteStock(Long id) {
        stockRepo.deleteById(id);
    }

    @Override
    public Stock findByticker(String ticker) {

        return stockRepo.findByticker(ticker);
    }
}

