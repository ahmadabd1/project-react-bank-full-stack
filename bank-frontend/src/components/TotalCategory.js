import React, { useState } from "react";
import "./styles/Breakdown.css";
import axios from "axios";
import ModalTransactions from "./ModalTransactions";

export default function TotalCategory({ totalCategores }) {

  const [display,setDisplay]=useState(false)
  const [data,setData]=useState([])

  const dispalyTheRecet= async function(category){
    const dataa =await axios.get(`http://localhost:8080/breakdown/${category}`)
    setData(dataa)
    setDisplay(true)
  }
 
  const handleMouseLeave = () => {
    setDisplay(null);
    setData([]);
  };
  return (
    <>
      {/* input daata make a map Transactions.map(trans => <Transaction data=trans /> ) */}
   
        <tr  onMouseLeave={handleMouseLeave} onMouseEnter={()=>dispalyTheRecet(totalCategores._id)}>
          <td >{totalCategores._id}</td>
          {display? <ModalTransactions data={data}/>:null}
          <td style={{color: totalCategores.event_count>0 ? "red" : "green"}}>{-totalCategores.event_count}$</td>
        </tr>
      
    </>
  );
}
