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
    <div>
      <h1 style={{ color: "orange" }}>Breakdown</h1>
      <br></br>
      <table className="breakdown">
        <tbody>
          <tr>
            <th>Categories</th>
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
