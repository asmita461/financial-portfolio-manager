import React, { useEffect, useState } from "react";
import axios from "axios";

const SellModal = (props) => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const API_KEY = process.env.REACT_APP_API_KEY2;

    const [numStocks, setNumStocks] = useState("");
    const [ticker, setTicker] = useState("");
    const [showSellOption, setShowSellOption] = useState("");
    const [tradePrice, setTradePrice] = useState("");
    const [stockList, setStockList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const now = new Date();
    const istDate = new Intl.DateTimeFormat('en-IN',{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
      hour12: false,
    }).format(now);

    const [date, time] = istDate.split(", ");
    const [day, month, year] = date.split('/');
    const formattedTimestamp = `${year}-${month}-${day}T${time}`;

    const handleSell = async(e) => {
      e.preventDefault();
      const holdingResponse = {
        ticker: ticker,
        volume: parseFloat(numStocks)*(-1),
        received: parseFloat(tradePrice)*parseFloat(numStocks),
        spent: 0,
      };
      const transactionResponse = {
        ticker: ticker,
        volume: parseFloat(numStocks),
        price: parseFloat(tradePrice),
        timeOfTransaction: formattedTimestamp,
        type: "SELL",
      }
      try{
        const response = await axios.post(`${SERVER_URL}/api/holding`, holdingResponse);
      }catch(error){
        console.log("Some error occurred! ", error)
        alert("Invalid entry", error)
        props.handler()
        return;
      }
      try{
        const response = await axios.post(`${SERVER_URL}/api/transaction`, transactionResponse);
        alert("Sell successful!");
        props.handler()
      }catch(error){
        console.log("Some error occurred! ", error)
        alert("Invalid entry", error)
        props.handler();
      }
  }

  const fetchLatestPrice = async() => {
    try{
      setLoading(true);
      const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`)
      var temp = response.data
      var tempPrice = "";
      temp.map((value)=>{
        if(value.symbol == ticker){
          tempPrice = value.price;
          setTradePrice(value.price);
        }
      })
      if(tempPrice == ""){
        alert("No such stock exists!");
        setLoading(false);
        return;
      }
      setShowSellOption(true);
      setLoading(false);   
      }catch(error){
          console.log(error);
      }
    }

    const fetchStockList = async() => {
      try{
        const response = await axios.get(`${SERVER_URL}/api/holding`);
        var temp = response.data;
        var arr = [];
        temp.map((value)=>{
          arr.push(value.ticker);
        })
        setStockList(arr);
      } catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchStockList();
    })

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#007ec3] p-4">Sell Stock</h2>
            <button
                  type="button"
                  onClick={()=>props.handler()}
                  className="bg-red-600 text-white px-2 rounded"
                >
                  X
                </button>
            </div>
            <form className="m-4 p-4">
            <label htmlFor="ticker" className="block text-gray-800 mb-2">
                Ticker
              </label>
              <select className="w-full p-2 bg-gray-100 border border-gray-300 rounded mb-4"
               value={ticker} id="ticker" onChange={(e)=>setTicker(e.target.value)}>
                <option value="" disabled>Select Stock</option>
                {stockList.map((option,index)=>(
                  <option key={index} value={option}>
                      {option}
                  </option>
                ))}
              </select>
                <button
                type="button"
                onClick={fetchLatestPrice}
                className="bg-gray-800 text-white px-4 py-2 mb-4 rounded hover:bg-[#007ec3]"
              >
                Get price
              </button>
              {showSellOption && (
                <div>
                    <label htmlFor="price" className="block text-gray-800 mb-2">
                Selling price
              </label>
              <input
                type="text"
                id="price"
                value={tradePrice}
                readOnly={true}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded mb-4"
              />
              <label htmlFor="numStocks" className="block text-gray-800 mb-2">
                Number of Stocks
              </label>
              <input
                type="number"
                id="numStocks"
                value={numStocks}
                onChange={(e) => setNumStocks(e.target.value)}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded mb-4"
                placeholder="Enter number of stocks"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleSell}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#007ec3]"
                >
                  Sell
                </button>
              </div>
                </div>
              )}
            </form>
          </div>
          {loading && (
                    <div className="bg-black  opacity-70 fixed top-0 left-0 h-screen w-screen ">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="h-16 w-16 animate-spin-slow rounded-full border-4 border-dashed border-[#3C83F9] "></div>
                        <h2 className="text-center text-white text-xl font-semibold">
                        Loading...
                        </h2>

                        <p className="w-1/3 text-center text-white">
                        This may take a few seconds, please {`don't`} close this page.
                        </p>
                    </div>
                    </div>
                )}
        </div>
    )
}

export default SellModal;