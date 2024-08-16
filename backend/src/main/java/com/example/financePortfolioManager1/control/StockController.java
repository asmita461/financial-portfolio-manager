package com.example.financePortfolioManager1.control;

import com.example.financePortfolioManager1.entities.Stock;

import com.example.financePortfolioManager1.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class StockController {
//    @Autowired
//    private StockService stockService;
//
//    @PostMapping
//    public ResponseEntity<Stock> saveStock(@RequestBody Stock stock) {
//        Stock newStock = stockService.saveStock(stock);
//        return new ResponseEntity<>(newStock, HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public List<Stock> getStocks() {
//        return stockService.getAllStocks();
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Stock> updateStockk(@PathVariable Long id, @RequestParam(required = false) String ticker, @RequestParam(required = false) String market) {
//        Stock s1 = stockService.updateStock(id, ticker, market);
//        return new ResponseEntity<>(s1, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Stock> deleteStockk(@PathVariable Long id) {
//        stockService.deleteStock(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @PostMapping("/{ticker}")
//    public ResponseEntity<Stock> findByticker(@PathVariable String ticker) {
//
//        Stock stock1 = stockService.findByticker(ticker);
//        return new ResponseEntity<Stock>(stock1, HttpStatus.OK);
//    }
//
//    @GetMapping("/{ticker}")
//    public Stock getStockData(@PathVariable String ticker) {
//        Stock stock = stockService.getStockData(ticker);
//        return stock;
//    }
}
