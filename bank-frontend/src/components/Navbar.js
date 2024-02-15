import React, { useEffect } from "react";
import './styles/Navbar.css';
import { Link } from "react-router-dom";

export default function Navbar({balance}) {

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
     <Link to='/Transactions'><h3>Transactions</h3></Link>    
      <Link to='/Operations'><h3>Operations</h3></Link>
      <Link to='/Breakdown'><h3>BreakDown</h3> </Link>   
      </div>
      <h3 className="balance" >Balance : <span style={{color:balance < 0 ? "red":"green"}}>{balance} $ </span></h3>    
      </div>
    </div>
  );
}