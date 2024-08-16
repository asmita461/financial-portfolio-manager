import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import BuyModal from "./BuyModal";
import SellModal from "./SellModal";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart2 from "./BarChart2";

const Dashboard = () => {

    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_API_KEY2;
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [ticker, setTicker] = useState("AMZN");
    const [time_delay, setTime_delay] = useState("5min");
    const [intradayDataX, setIntradayDataX] = useState([]);
    const [intradayDataY, setInradayDataY] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [dailyDataX, setDailyDataX] = useState();
    const [dailyDataY, setDailyDataY] = useState();
    const [buyModalOpen, setBuyModalOpen] = useState(false);
    const [sellModalOpen, setSellModalOpen] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [priceAAPL, setPriceAAPL] = useState("");
    const [priceMSFT, setPriceMSFT] = useState("");
    const [priceIBM, setPriceIBM] = useState("");
    const [priceMETA, setPriceMETA] = useState("");
    const [priceTSLA, setPriceTSLA] = useState("");
    const [priceAMZN, setPriceAMZN] = useState("");
    const [gainers, setGainers] = useState([]);
    const [holdingTicker, setHoldingTicker] = useState([]);
    const [holdingPrice, setHoldingPrice] = useState([]);
    const [loading, setLoading] = useState(false);

    const closeBuyModal = () => {
        setBuyModalOpen(false);
    }

    const closeSellModal = () => {
        setSellModalOpen(false);
    }

    const searchTicker = async() => {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${time_delay}/${searchItem}?from=&apikey=${API_KEY}`)
        var arr = response.data;
        if(arr.length!=0){
            setTicker(searchItem);
        }else{
            alert("No such ticker exists!")
        }
    }

    const fetchStockData = async() => {
        try{
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/holding`);
            const prices = await axios.get(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`)
            var pricesData = prices.data;
            var arr = response.data;
            if(arr.length==0) return;
            var tempHoldingTicker = [];
            var tempHoldingPrice = [];
            arr.map((value)=>{
                tempHoldingTicker.push(value.ticker);
                const p = pricesData.find(stock => stock.symbol === value.ticker);
                if(p){
                    var cal = (p.price)*(value.volume);
                    tempHoldingPrice.push(cal);
                }
            })
            setHoldingTicker(tempHoldingTicker);
            setHoldingPrice(tempHoldingPrice);
            setLoading(false);
        } catch (error){
            console.log(error);
        }
    }

    const fetchDailyData = async() => {
        try{
            setLoading(true);
            if(ticker != ""){
            const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${API_KEY}`)
            var temp = response.data
            if(temp.historical) {var arr = temp.historical;}
            }else{
                setLoading(false);
                return;
            }
            
            if(arr.length==0) {return;}
            const newArrX = []
            const newArrY=[]
            for(var i=0;i<arr.length;i++){
                newArrX[i] = arr[i].date;
                newArrY[i] = arr[i].close;
            }
            newArrX.reverse();
            newArrY.reverse();
            setDailyDataX(newArrX);
            setDailyDataY(newArrY)
            setLoading(false);
           
        }catch(error){
            console.log(error);
        }
    }

    const fetchIntradayData = async() => {
      try{
            setLoading(true);
            if(ticker!=""){
            const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${time_delay}/${ticker}?from=&apikey=${API_KEY}`)
            var arr = response.data
            }else{
                setLoading(false);
                return;
            }
          
          
          if(arr.length==0) {setLoading(false);return;}
          const newArrX = []
          const newArrY=[]
          var temp = [];
          var temp2 = arr[arr.length-1];
          temp.push(temp2.high);
          temp.push(temp2.low);
          temp.push(temp2.open);
          temp.push(temp2.close);
          setStockData(temp);
          for(var i=0;i<arr.length;i++){
              newArrX[i] = arr[i].date;
              newArrY[i] = arr[i].close;
          }
          newArrX.reverse();
          newArrY.reverse();
          setIntradayDataX(newArrX);
          setInradayDataY(newArrY)
            setLoading(false);
         
      }catch(error){
          console.log(error);
      }
  }

  const fetchAllPrices = async() => {
    try{
        setLoading(true);
      const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`)
      var arr = response.data
      
      if(arr.length==0) {return;}
      arr.map((value)=>{
        if(value.symbol == "AAPL")
        setPriceAAPL(value.price);
        if(value.symbol == "MSFT")
        setPriceMSFT(value.price);
        if(value.symbol == "IBM")
        setPriceIBM(value.price);
        if(value.symbol == "META")
        setPriceMETA(value.price);
        if(value.symbol == "TSLA")
        setPriceTSLA(value.price);
        if(value.symbol == "AMZN")
        setPriceAMZN(value.price);
      })
      setLoading(false);
     
  }catch(error){
      console.log(error);
  }
  }

  const fetchGainers = async() => {
    try{
        setLoading(true);
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`);
        const arr = response.data;
        var temp = [];
        for(var i=0;i<5;i++){
            temp.push({name: arr[i].name, change: arr[i].changesPercentage});
        }
        setGainers(temp);
        setLoading(false);
    } catch (error) {
        console.log(error)
    }
  }

    useEffect(()=>{
        fetchIntradayData();
        fetchDailyData();
    }, [ticker])

    useEffect(()=>{
    fetchStockData();
      fetchAllPrices();
      fetchGainers();
      
    },[])

    return(
        <>
            <div className="min-h-screen bg-gray-200 flex">
            {/* Sidebar */}
            <aside className="w-full md:w-auto bg-white shadow-lg p-4">
            <div className="flex items-center justify-start">
                <img src="/logo.png" height={20} width={80}/>
                <div className="text-4xl font-bold mb-10 mt-6 pt-4 mr-4 text-[#007ec3]">TRADEVAULT</div>
                </div>
                <nav>
                <ul className="space-y-6 mt-16 mx-6">
                    <li>
                    <button onClick={()=>navigate("/")} className="font-semibold text-xl py-1 px-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300">Dashboard</button>
                    </li>
                    <li>
                    <button onClick={()=>navigate("/profile")} className="font-semibold text-xl py-1 px-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300">My Portfolio</button>
                    </li>
                    <li>
                    <button onClick={()=>setBuyModalOpen(true)} className="font-semibold text-xl py-1 px-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300">Buy Stocks</button>
                    </li>
                    <li>
                    <button onClick={()=>setSellModalOpen(true)} className="font-semibold text-xl py-1 px-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300">Sell Stocks</button>
                    </li>
                </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 rounded-lg shadow-lg p-10">
                <header className="flex justify-between items-center mb-10">
                <div className="text-2xl font-semibold">Dashboard</div>
                <div className="flex items-center space-x-4">
                    <input
                    type="text"
                    placeholder="Enter ticker"
                    onChange={(e)=>setSearchItem(e.target.value)}
                    value={searchItem}
                    className="border border-gray-300 rounded-lg p-2"
                    />
                    <button
                    type="button"
                    onClick={searchTicker}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#007ec3]"
                    >
                    Search
                    </button>
                </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-6 gap-6 mb-10">
                <div className="col-span-6 text-2xl font-semibold">
                    Stock Prices Data: {ticker.toUpperCase()}
                </div>

                {/* <div className="col-span-6 space-x-4">
                    <button onClick={(e)=>{setTicker("AAPL");}} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-600" value="AAPL">AAPL</button>
                    <button onClick={(e)=>{setTicker("MSFT");}} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-600" value="MSFT">MSFT</button>
                    <button onClick={(e)=>{setTicker("IBM");}} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-600" value="IBM">IBM</button>
                    <button onClick={(e)=>{setTicker("META");}} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-600" value="META">META</button>
                    <button onClick={(e)=>{setTicker("TSLA");}} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-600" value="TSLA">TSLA</button>
                    <button onClick={(e)=>{setTicker("AMZN");}} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-600" value="AMZN">AMZN</button>
                </div> */}

                <div className="col-span-3 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-center text-gray-700 font-bold mb-4">Stock prices at a time interval of 5 mins</div>
                    <div className="h-80 flex justify-center items-center">
                    {/* Placeholder for Graph */}
                    {intradayDataX[0] != undefined ? (
                        <span><LineChart xData={intradayDataX} yData={intradayDataY}/></span>
                    ):(<div>No data</div>)}
                    </div>
                </div>
                <div className="col-span-3 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-center text-gray-700 font-bold mb-4">Day wise stock prices</div>
                    <div className="h-80 flex justify-center items-center">
                    {/* Placeholder for Graph */}
                    {dailyDataX ? (
                        <span><LineChart xData={dailyDataX} yData={dailyDataY}/></span>
                    ):(<div>No data</div>)}
                    </div>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg col-span-6">
                    <div className="font-bold mb-4">Latest high, low, open and close</div>
                    <div className="h-48 flex justify-center items-center">
                    {/* Placeholder for Bar Chart */}
                    {stockData.length>0 && <BarChart2 xData={["high", "low", "open", "close"]} yData1={stockData}/>}
                    </div>
                </div>

                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-gray-600">AAPL</div>
                    <div className="text-2xl font-bold">${priceAAPL}</div>
                </div>

                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-gray-600">MSFT</div>
                    <div className="text-2xl font-bold">${priceMSFT}</div>
                </div>

                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-gray-600">IBM</div>
                    <div className="text-2xl font-bold">${priceIBM}</div>
                </div>

                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-gray-600">META</div>
                    <div className="text-2xl font-bold">${priceMETA}</div>
                </div>

                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-gray-600">TSLA</div>
                    <div className="text-2xl font-bold">${priceTSLA}</div>
                </div>

                <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="text-gray-600">AMZN</div>
                    <div className="text-2xl font-bold">${priceAMZN}</div>
                </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <div className="font-bold mb-4">Top Gainers (Week)</div>
                    <div className="space-y-2">
                        {gainers && gainers.map((value)=>(
                            <div key={value.name} className="flex justify-between">
                                <span>{value.name}</span> <span className="text-green-600">▲{value.change}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <div className="font-bold mb-4">Diversification</div>
                    <div className="h-32 flex justify-center items-center">
                    {/* Placeholder for Pie Chart */}
                    {holdingPrice && <PieChart labels={holdingTicker} dataValues={holdingPrice}/>}
                    </div>
                </div>
                </div>
            </main>
            </div>
            {buyModalOpen && <BuyModal handler={closeBuyModal}/>}
            {sellModalOpen && <SellModal handler={closeSellModal}/>}
            
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

        </>
    )
}

export default Dashboard;