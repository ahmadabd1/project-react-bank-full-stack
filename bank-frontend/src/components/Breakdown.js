import React, { useEffect, useState } from "react";
import TotalCategory from "./TotalCategory";
import "../App.css";
import axios from "axios";
export default function Breakdown() {
  const [breakDown, setBreakDown] = useState([]);

  useEffect(() => {
    async function fetchBreakdown() {
      const res = await axios.get(
        "http://localhost:8080/transaction/breakdown"
      );
      setBreakDown(res.data);
    }
    fetchBreakdown();
  }, []);

  return (
    <div className="App">
      <h1 style={{ color: "orange" }}>Breakdown</h1>
      <table className="breakdown App">
        <tbody className="App">
        <tr>
          <th>Categores</th>
          <th>Amount</th>
        </tr>
        {breakDown.map((c, i) => {
          return <TotalCategory key={i} totalCategores={c} />;
        })}
        </tbody>
      </table>
    </div>
  );
}
