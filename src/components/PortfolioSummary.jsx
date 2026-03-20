import { useEffect, useState } from "react";

export default function PortfolioSummary(){

  const [summary,setSummary] = useState({
    invested:0,
    value:0,
    pnl:0
  });

  useEffect(()=>{

    const trades = JSON.parse(localStorage.getItem("trades") || "[]");

    let invested = 0;
    let value = 0;

    trades.forEach(t=>{
      const live = t.price + (Math.random()-0.5)*8;
      invested += t.price * t.qty;
      value += live * t.qty;
    });

    setSummary({
      invested:invested.toFixed(2),
      value:value.toFixed(2),
      pnl:(value-invested).toFixed(2)
    });

  },[]);

  const isUp = summary.pnl > 0;

  return(
    <div style={{
      background:"#0b1220",
      padding:"25px",
      borderRadius:"20px",
      marginBottom:"25px",
      color:"white"
    }}>
      <h3>Portfolio Summary</h3>

      <p>Invested: ${summary.invested}</p>
      <p>Current Value: ${summary.value}</p>

      <p style={{
        color:isUp?"#00ff88":"#ff4d4d",
        fontWeight:"bold"
      }}>
        PnL: ${summary.pnl}
      </p>
    </div>
  );
}