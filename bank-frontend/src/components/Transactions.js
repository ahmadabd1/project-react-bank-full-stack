import React from "react";
import "./styles/Transactions.css";
import Transaction from "./Transaction";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export default function Transactions(props) {
  const years = [
    {},
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
    { value: "2012", label: "2012" },
    { value: "2011", label: "2011" },
    { value: "2010", label: "2010" },
    { value: "2009", label: "2009" },
    { value: "2008", label: "2008" },
    { value: "2007", label: "2007" },
    { value: "2006", label: "2006" },
    { value: "2005", label: "2005" },
    { value: "2004", label: "2004" },
    { value: "2003", label: "2003" },
    { value: "2002", label: "2002" },
    { value: "2001", label: "2001" },
    { value: "2000", label: "2000" },
    { value: "1999", label: "1999" },
    { value: "1998", label: "1998" },
    { value: "1997", label: "1997" },
    { value: "1996", label: "1996" },
  ];
  const months = [
    {},
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const [transData, setTransData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/transaction")
      .then((res) => res.json())
      .then((data) => setTransData(data));
  }, []);

  const DeleteTransaction = async function (id) {
    await axios.delete(`http://localhost:8080/transaction/${id}`);
    setTransData(transData.filter((transes) => transes._id !== id));
    props.handleClick();
    props.message("Transaction deleted successfully");
  };
  
  
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState("");
  
  const DeleteMonthYearTransaction = async function (id) {
    await axios.delete(`http://localhost:8080/transaction/${id}`);
    setTransData(transData.filter((transes) => transes._id !== id));
    setTransactionsMonthYear(transactionsMonthYear.filter((transes) => transes._id !== id));
    props.handleClick();
    props.message("Transaction deleted successfully");
  };

  // const [selectBothMonthAndYear,setSelectBothMonthAndYear]=useState({})

  const [transactionsMonthYear, setTransactionsMonthYear] = useState([])

  const handelSelectDate = async function(month,year){
    try {
      const response = await axios.get(
        `http://localhost:8080/transactions/${month}/${year}`
      );
      setTransactionsMonthYear(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(()=>{
    if(!selectedMonth.value || !selectedYear.value){
      return
    }
    const getData = async function () {
      let transactionsMonthYear = await handelSelectDate(selectedMonth.value, selectedYear.value)
      if(transactionsMonthYear){
      setTransactionsMonthYear(transactionsMonthYear)
      }
  }
  getData()

    // selectBothMonthAndYear = handelSelectDate(selectedMonth.value,selectedYear.value)
  },[selectedMonth,selectedYear])
  return (
    <>
      <h1 className="App" style={{ color: "orange" }}>
        Transactions
      </h1>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <div className="select">
          <Select options={months} value={selectedMonth} onChange={e=>setSelectedMonth(e)}/>
          <Select options={years} value={selectedYear} onChange={e=>setSelectedYear(e)}/>
        </div>
      </div>
      <br></br>
      <br></br>
      <table className="tableTransactions">
        <tbody>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </tbody>
        <tbody>
          {(!selectedMonth.value || !selectedYear.value) && transData.map((tran, i) => {
            return (
              <Transaction
                key={i}
                tran={tran}
                DeleteTransaction={DeleteTransaction}
              />
            );
          })}
          {(selectedMonth.value && selectedYear.value) && transactionsMonthYear.map((tran, i) => {
            return (
              <Transaction
                key={i}
                tran={tran}
                DeleteTransaction={DeleteMonthYearTransaction}
              />
            );
          }) }
        </tbody>
      </table>
    </>
  );
}
