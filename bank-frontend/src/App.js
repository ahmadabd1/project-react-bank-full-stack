import "./App.css";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import Footer from "./components/Footer";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function App() {
  const [balance, setBalance] = useState(0);
  const [balanceId, setBalanceId] = useState(null);
  useEffect(() => {
    async function initBalance() {
      const budget = await axios.get("http://localhost:8080/balance");

      setBalanceId(budget.data[0]._id);
      setBalance(budget.data[0].balance);
    }
    initBalance();
  }, []);
  const updateBalance = async function (transactiomamount) {
    const newDataBalance = balance + transactiomamount;
    setBalance(balance + transactiomamount);
    // updatBalanceData()
    const budget = await axios.put(
      "http://localhost:8080/balance/" + balanceId,
      { balance: newDataBalance }
    );
    setBalance(budget.data.balance);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //--------------------------

  return (
    <div className="App">
      <Router>
        <Navbar balance={balance} />
        <Routes>
          <Route
            path="/Transactions"
            element={
              <Transactions handleClick={handleClick} message={setMessage} />
            }
          />
          <Route
            path="/Operations"
            element={
              <Operations
                balance={balance}
                updateBalance={updateBalance}
                handleClick={handleClick}
                message={setMessage}
              />
            }
          />
          <Route path="/Breakdown" element={<Breakdown />} />
        </Routes>
        <div className="App">
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
