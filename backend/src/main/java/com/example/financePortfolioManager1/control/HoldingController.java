package com.example.financePortfolioManager1.control;

import com.example.financePortfolioManager1.entities.Holding;
import com.example.financePortfolioManager1.services.HoldingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holding")
@CrossOrigin
public class HoldingController {
    @Autowired
    private HoldingService holdingService;

    @PostMapping
    public ResponseEntity<Holding> saveHolding(@RequestBody Holding holding){

        String t = holding.getTicker();
        double v = holding.getVolume();
        double r = holding.getReceived();
        double s = holding.getSpent();

        Holding newHolding;
        if ((holdingService.findByTicker(t)) == null ) {
            newHolding = holdingService.savePortfolio(holding);
            return new ResponseEntity<>(newHolding, HttpStatus.CREATED);
        }
        else {
            newHolding = holdingService.updatePortfolio(t, v, r, s);

            if (newHolding == null) {
                return new ResponseEntity<>(null, HttpStatusCode.valueOf(403));
            }
            else
                return new ResponseEntity<>(newHolding, HttpStatus.CREATED);
        }


    }


    @GetMapping
    public List<Holding> getStocks() {
        return holdingService.getAllHoldings();
    }

    @GetMapping("/{ticker}")
    public ResponseEntity<Holding> findByTicker(@PathVariable String ticker){
        Holding h = holdingService.findByTicker(ticker);
        return new ResponseEntity<Holding>(h , HttpStatus.OK);
    }

}
