import React, { useState } from 'react'
import axios from 'axios';
import './styles/Operations.css'
import { useNavigate } from 'react-router-dom';
export default function Operations(props) {

  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate()
  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTransaction = async () => {
    // Implement logic to add transaction
    await axios.post(`http://localhost:8080/transaction`,{
      amount: (1)*amount,
        category: transactionType,
        vendor: description
    });
    props.updateBalance(1*amount)
    navigate('/Transactions')
    
  };
  const handleSubTransaction = async () => {
    // Implement logic to add transaction
 
    await axios.post(`http://localhost:8080/transaction`,{
      amount: (-1)*amount,
        category: transactionType,
        vendor: description
    });
    props.updateBalance((-1)*amount)
    navigate('/Transactions')
    
  };
  
  return (
    <div className='operations'>
   <section className="transactions">
        <h2>Insert Operations</h2>
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <input type="text" id="transactionType" value={transactionType} onChange={handleTransactionTypeChange} />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input  type="number" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
        <div>
          <label htmlFor="description">Category:</label>
          <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <br></br>
        <div className='button-group'>
          <button className='Deposit' onClick={handleAddTransaction}>Deposit</button>
          <button className='Withdraw' onClick={handleSubTransaction}>Withdraw</button>
        </div>
      </section>

      {/* Add more sections for other operations */}
  
   </div>
  )
}
