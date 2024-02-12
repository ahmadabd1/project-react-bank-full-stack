import React from "react";
import "./styles/Transactions.css";
import Transaction from "./Transaction";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Transactions() {
  const [transData, setTransData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/transaction")
      .then((res) => res.json())
      .then((data) => setTransData(data));
  }, []);

  const DeleteTransaction = async function (id) {
    await axios.delete(`http://localhost:8080/transaction/${id}`);
    setTransData(transData.filter((transes) => transes._id !== id));
  };

  return (
    <>
      <h1 className="App" style={{ color: "orange" }}>
        Transactions
      </h1>

      <table className="tableTransactions">
        <tbody>
        <tr>
          <th>Item</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
        </tbody>
<tbody>
   {transData.map((tran, i) => {
          return (
            <Transaction
              key={i}
              tran={tran}
              DeleteTransaction={DeleteTransaction}
            />
          );
        })}
        </tbody>
       
      </table>
    </>
  );
}
