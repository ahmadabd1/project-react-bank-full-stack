import React, { useState } from "react";
import axios from "axios";
import "./styles/Operations.css";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-datepicker/dist/react-datepicker.css";

export default function Operations(props) {

  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const inputsIsEmpty = function () {
    if (transactionType === "" || description === "" || amount === "") {
      props.handleClick();
      props.message("Fill in the inputs");
      return true;
    }
    return false;
  };
  const handleAddTransaction = async () => {
    // Implement logic to add transaction
    if (inputsIsEmpty()) {
      return;
    } else {
      await axios.post(`http://localhost:8080/transaction`, {
        amount: 1 * amount,
        category: description,
        vendor:  transactionType,
        date:date
      });
      props.updateBalance(1 * amount);
      navigate("/Transactions");
      props.handleClick();
      props.message("Transaction deposite added successfully");
     
    }
  };
  const handleSubTransaction = async () => {
    // Implement logic to add transaction

    if (inputsIsEmpty()) {
   
      return;
    } else if (props.balance - amount < 500) {
      props.handleClick();
      props.message("Insufficient Funds");
      return;
    } else {
      await axios.post(`http://localhost:8080/transaction`, {
        amount: -1 * amount,
        category:  description,
        vendor: transactionType,
        date:date
      });
      props.updateBalance(-1 * amount);
      navigate("/Transactions");
      props.handleClick();
      props.message("Transaction withdraw  added successfully");
    }
  };

  //snackbar
  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  return (
    <div className="operations">
      <section className="transactions">
        <h2>Insert Operations</h2>
        <br></br>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
    
        <div>
          <label htmlFor="description">Category</label>
          <input
            type="text1"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="transactionType">Vendor</label>
          <input
            type="text1"
            id="transactionType"
            value={transactionType}
            onChange={handleTransactionTypeChange}
          />
        </div>
        <br></br>
        
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(date) => setDate({ date })} />
          </LocalizationProvider>
      
        <br></br><br></br>
        <div className="button-group">
          <button className="Deposit" onClick={handleAddTransaction}>
            Deposit
          </button>
          <button className="Withdraw" onClick={handleSubTransaction}>
            Withdraw
          </button>
        </div>
      </section>
    </div>
  );
}
