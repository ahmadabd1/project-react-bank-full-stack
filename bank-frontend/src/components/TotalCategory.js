import React from "react";
import "./styles/Breakdown.css";
export default function TotalCategory({ totalCategores }) {
  return (
    <>
      {/* input daata make a map Transactions.map(trans => <Transaction data=trans /> ) */}
   
        <tr>
          <td>{totalCategores._id}</td>
          <td>{-totalCategores.event_count}$</td>
        </tr>
      
    </>
  );
}
