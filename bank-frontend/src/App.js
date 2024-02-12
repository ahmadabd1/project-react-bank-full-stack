import "./App.css";
import Navbar from "./components/Navbar";

import { useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import Footer from "./components/Footer";
import axios from "axios";


function App() {
  const [balance,setBalance]=useState(0) ;
const [balanceId,setBalanceId]=useState(null)
useEffect(()=>{

  async function initBalance(){
    const budget = await axios.get('http://localhost:8080/balance')
    
    setBalanceId(budget.data[0]._id)
    setBalance(budget.data[0].balance)
  }
  initBalance()
},[])
  
const updateBalance = async function(transactiomamount){
  const newDataBalance=balance+transactiomamount
  setBalance(balance+transactiomamount)
  // updatBalanceData()
  const budget = await axios.put("http://localhost:8080/balance/"+balanceId,{balance:newDataBalance})
  setBalance(budget.data.balance)
}



  return (
    <Router>
      <Navbar balance={balance}  />
      <main className="main-content">
        <Routes>
          <Route path="/Transactions" element={<Transactions   />} /> 
          <Route path="/Operations" element={<Operations updateBalance={updateBalance}/>} />
          <Route path="/Breakdown" element={<Breakdown />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
