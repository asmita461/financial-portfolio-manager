import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarChart from './BarChart';
import LineChart from './LineChart';
import BuyModal from './BuyModal';
import SellModal from './SellModal';

const Profile = () => {

  const navigate = useNavigate();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const API_KEY = process.env.REACT_APP_API_KEY2;
    const [holding, setHolding] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [holdingSpent, setHoldingSpent] = useState([]);
    const [holdingReceived, setHoldingReceived] = useState([]);
    const [holdingTicker, setHoldingTicker] = useState([]);
    const [transactionTime, setTransactionTime] = useState([]);
    const [transactionVolume, setTransactionVolume] = useState([]);
    const [transactionNetTrans, setTransactionNetTrans] = useState([]);
    const [buyModalOpen, setBuyModalOpen] = useState(false);
    const [sellModalOpen, setSellModalOpen] = useState(false);
    const [currentPriceData, setCurrentPriceData] = useState([]);
    const [balance, setBalance] = useState(0);
    const [searchHolding, setSearchHolding] = useState("");
    const [filterHolding, setFilterHolding] = useState([]);
    const [showHolding, setShowHolding] = useState(true);
    const [searchTransactionByTicker, setSearchTransactionByTicker] = useState("");
    const [searchTransactionByType, setSearchTransactionByType] = useState("");
    const [filterTransaction, setFilterTransaction] = useState([]);
    const [showTransaction, setShowTransaction] = useState(true);
    const [loading, setLoading] = useState(false);

    const closeBuyModal = () => {
      setBuyModalOpen(false);
      window.location.reload();
  }

  const closeSellModal = () => {
      setSellModalOpen(false);
      window.location.reload();
  }

    const fetchHolding = async() => {
      try{
        if(searchHolding==""){
          setShowHolding(true);
        const response = await axios.get(`${SERVER_URL}/api/holding`);
        setHolding(response.data);
        var arr = response.data;
        if(arr.length==0) return;
        var tempHoldingTicker = [];
        var tempHoldingSpent = [];
        var tempHoldingReceived = [];
        arr.map((value)=>{
            tempHoldingTicker.push(value.ticker);
            tempHoldingSpent.push(value.spent);
            tempHoldingReceived.push(value.received);
        })
        setHoldingTicker(tempHoldingTicker);
        setHoldingSpent(tempHoldingSpent);
        setHoldingReceived(tempHoldingReceived);
      }else{
        const response = await axios.get(`${SERVER_URL}/api/holding/${searchHolding}`);
        setFilterHolding(response.data);
        setShowHolding(false);
      }
    } catch (error){
        console.log(error);
    }
    }

    const fetchTransactionByType = async() => {
    try{
      setSearchTransactionByTicker("");
      const response = await axios.get(`${SERVER_URL}/api/transaction/type/${searchTransactionByType}`);
        setFilterTransaction(response.data);
        setShowTransaction(false);
    }catch(error){
      console.log(error);
    }
    }

    const fetchTransactionByTicker = async() => {
      try{
        setSearchTransactionByType("")
        const response = await axios.get(`${SERVER_URL}/api/transaction/ticker/${searchTransactionByTicker}`);
          setFilterTransaction(response.data);
          setShowTransaction(false);
      }catch(error){
        console.log(error);
      }
      }

    const fetchTransaction = async() => {
        try{
          setShowTransaction(true);
            const response = await axios.get(`${SERVER_URL}/api/transaction`);
            setTransaction(response.data);
            var arr = response.data;
            if(arr.length==0) return;
            var tempTransactionTime = [];
            var tempTransactionVolume = [];
            var tempTransactionNetTrans = [];
            arr.map((value)=>{
                tempTransactionTime.push(value.timeOfTransaction);
                tempTransactionVolume.push(value.volume);
                tempTransactionNetTrans.push(value.netTrans);
            })
            setTransactionTime(tempTransactionTime);
            setTransactionVolume(tempTransactionVolume);
            setTransactionNetTrans(tempTransactionNetTrans);
        } catch (error){
            console.log(error);
        }
    }

    const fetchAllPrices = async() => {
      try{
          setLoading(true);
          const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`)
          var arr = response.data
          
          if(arr.length==0) {setLoading(false);return;}
          setCurrentPriceData(arr);
          setLoading(false);       
      }catch(error){
          console.log(error);
      }
    }

    const getBalance = async() => {
      try{
        const response = await axios.get(`${SERVER_URL}/api/transaction/balance`);
        setBalance(response.data);
      }catch(error){
        console.log(error);
      }
    }

    const netWorthCalc = () => {
      return holding.reduce((netWorth, h)=>{
        const stock = currentPriceData.find(stock=> stock.symbol === h.ticker);
        if(stock){
          netWorth += stock.price*h.volume;
        }
        return netWorth;
      },0);
    }

    const spentCalc = () => {
      return holding.reduce((spentAmount, h)=>{
        spentAmount += h.spent;
        return spentAmount;
      },0);
    }

    const receivedCalc = () => {
      return holding.reduce((receivedAmount, h)=>{
        receivedAmount += h.received;
        return receivedAmount;
      },0);
    }

    const portfolioValue = netWorthCalc();
    const profit = (portfolioValue+balance).toFixed(2);
    const spent = spentCalc();
    const received =  receivedCalc();
    const netWorth = (portfolioValue+received).toFixed(2);
    const profitPercentage = ((profit/spent)*100).toFixed(2);
    

    useEffect(()=>{
        fetchHolding();
        fetchTransaction();
        fetchAllPrices();
        getBalance();
    },[])
  return (
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
      <div className=" flex-1 rounded-lg shadow-lg p-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            User Portfolio Management Metric Dashboard
          </h1>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="text-yellow-600 mb-2">Net Worth</div>
            {netWorth ? (<div className="text-4xl font-bold">${netWorth}</div>) : (<div className="text-4xl font-bold">0</div>)}
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <div className="text-blue-800 mb-2">Profit</div>
            {profit ? (<div className="text-4xl font-bold">${profit}</div>) : (<div className="text-4xl font-bold">0</div>)}
          </div>
          <div className="bg-teal-100 p-4 rounded-lg text-center">
            <div className="text-teal-600 mb-2">Profit Percentage</div>
            {profitPercentage ? (<div className="text-4xl font-bold">{profitPercentage}%</div>) : (<div className="text-4xl font-bold">0</div>)}
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-center text-gray-700 font-bold mb-4">My holdings</div>
            {/* Placeholder for the chart */}
            <div className="flex items-right justify-end space-x-4 mt-8 mb-2">
                    <input
                    type="text"
                    placeholder="Search"
                    onChange={(e)=>setSearchHolding(e.target.value)}
                    value={searchHolding}
                    className="border border-gray-300 rounded-lg p-1"
                    />
                    <button
                    type="button"
                    onClick={()=>fetchHolding()}
                    className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-[#007ec3]"
                    >
                    Search
                    </button>
                </div>
            <div className="h-auto flex items-start justify-center text-black">
              <table className='border border-2 p-2 min-w-full table-fixed'>
                <thead className='bg-gray-800 text-white uppercase leading-normal'>
                <tr>
                    <th className='text-center p-1 w-1/3 border border-1 border-white'>Id</th>
                    <th className='text-center p-1 w-1/3 border border-1 border-white'>Ticker</th>
                    <th className='text-center p-1 w-1/3 border border-1 border-white'>Volume</th>
                </tr>
                </thead>
                <tbody className='text-gray-800'>
                {showHolding ? (holding.map((value)=>(
                    <tr key={value.id} className='border border-1 hover:bg-gray-100'>
                        <td className='text-center p-1 border border-1'>{value.id}</td>
                        <td className='text-center p-1 border border-1'>{value.ticker}</td>
                        <td className='text-center p-1 border border-1'>{value.volume}</td>
                    </tr>
                ))) : filterHolding!=null ? (
                    <tr key={filterHolding.id} className='border border-1 hover:bg-gray-100'>
                        <td className='text-center p-1 border border-1'>{filterHolding.id}</td>
                        <td className='text-center p-1 border border-1'>{filterHolding.ticker}</td>
                        <td className='text-center p-1 border border-1'>{filterHolding.volume}</td>
                    </tr>
                ) : (<div>NO DATA</div>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-center text-gray-700 font-bold mb-4">Invested amount by Ticker</div>
            {/* Placeholder for the chart */}
            <div className="h-64 flex items-center justify-center text-gray-400 ">
                <BarChart xData={holdingTicker} yData1={holdingSpent} yData2={holdingReceived}/>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-gray-700 font-bold mb-4">Transaction History</div>
            {/* Placeholder for the chart */}
            <div className='flex'>
            <div className="flex items-right justify-end space-x-4 mt-8 mb-2 mr-4">
                <select className="w-full p-1 bg-gray-100 border border-gray-300 rounded"
                  value={searchTransactionByTicker} id="s1" onChange={(e)=>setSearchTransactionByTicker(e.target.value)}>
                    <option value="" disabled>Select ticker</option>
                    {holdingTicker.map((option,index)=>(
                      <option key={index} value={option}>
                          {option}
                      </option>
                    ))}
                  </select>
                    <button
                    type="button"
                    onClick={()=>fetchTransactionByTicker()}
                    className="bg-gray-800 text-white px-4 rounded hover:bg-[#007ec3]"
                    >
                    Search
                    </button>
                </div>
                <div className="flex items-right justify-end space-x-4 mt-8 mb-2 mr-4">
                    <select className="w-full p-1 bg-gray-100 border border-gray-300 rounded "
                  value={searchTransactionByType} id="s2" onChange={(e)=>setSearchTransactionByType(e.target.value)}>
                      <option value="" disabled>Select type</option>
                      <option value="BUY">Bought</option>
                      <option value="SELL">Sold</option>
                  </select>
                    <button
                    type="button"
                    onClick={()=>fetchTransactionByType()}
                    className="bg-gray-800 text-white px-4 rounded hover:bg-[#007ec3]"
                    >
                    Search
                    </button>
                </div>
                <button className='p-2 mt-6' onClick={()=>{fetchTransaction(); setSearchTransactionByTicker(""); setSearchTransactionByType("")}}>
                  <svg fill="#8898AA" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 383.748 383.748" xmlSpace="preserve">
                  <g>
                    <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
                      C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
                      L2.081,34.641v113.365h113.91L62.772,95.042z"/>
                    <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
                      c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
                      c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"/>
                  </g>
                  </svg>
                </button>
              </div>
            <div className="h-auto flex items-center justify-center text-black">
              <table className='border border-2 p-2 min-w-full table-fixed'>
                <thead className='bg-gray-800 text-white uppercase leading-normal'>
                <tr>
                    <th className='text-center p-1 w-1/6 border border-1 border-white'>Id</th>
                    <th className='text-center p-1 w-1/6 border border-1 border-white'>Ticker</th>
                    <th className='text-center p-1 w-1/6 border border-1 border-white'>Price</th>
                    <th className='text-center p-1 w-1/6 border border-1 border-white'>Volume</th>
                    <th className='text-center p-1 w-1/6 border border-1 border-white'>Time of Transaction</th>
                    <th className='text-center p-1 w-1/6 border border-1 border-white'>Type</th>
                </tr>
                </thead>
                <tbody className='text-gray-800'>
                {showTransaction ? (transaction.map((value)=>(
                    <tr key={value.id} className='border border-1 hover:bg-gray-100'>
                        <td className='text-center p-1 border border-1'>{value.id}</td>
                        <td className='text-center p-1 border border-1'>{value.ticker}</td>
                        <td className='text-center p-1 border border-1'>{value.price}</td>
                        <td className='text-center p-1 border border-1'>{value.volume}</td>
                        <td className='text-center p-1 border border-1'>{value.timeOfTransaction}</td>
                        {value.type=="BUY" && <td className='text-center p-1 border border-1 text-green-600'>Bought</td>}
                        {value.type=="SELL" && <td className='text-center p-1 border border-1 text-red-600'>Sold</td>}
                    </tr>
                ))) : filterTransaction.length>0 ? (
                  filterTransaction.map((value)=>(
                    <tr key={value.id} className='border border-1 hover:bg-gray-100'>
                        <td className='text-center p-1 border border-1'>{value.id}</td>
                        <td className='text-center p-1 border border-1'>{value.ticker}</td>
                        <td className='text-center p-1 border border-1'>{value.price}</td>
                        <td className='text-center p-1 border border-1'>{value.volume}</td>
                        <td className='text-center p-1 border border-1'>{value.timeOfTransaction}</td>
                        {value.type=="BUY" && <td className='text-center p-1 border border-1 text-green-600'>Bought</td>}
                        {value.type=="SELL" && <td className='text-center p-1 border border-1 text-red-600'>Sold</td>}
                    </tr>
                ))): (<div>NO DATA</div>)}
                </tbody>
              </table>
            </div>
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="text-center text-gray-700 font-bold mb-4">Stocks bought/sold by Time</div>
                    {/* Placeholder for the chart */}
                    <div className="h-64 flex items-center justify-center text-gray-400 ">
                        <LineChart xData={transactionTime} yData={transactionVolume}/>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="text-center text-gray-700 font-bold mb-4">Net Transaction by Time</div>
                    {/* Placeholder for the chart */}
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        <LineChart xData={transactionTime} yData={transactionNetTrans}/>
                    </div>
                </div>
            </div>
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
    </div>
  );
};

export default Profile;

