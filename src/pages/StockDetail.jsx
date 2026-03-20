import { useParams } from "react-router-dom";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

export default function StockDetail(){

  const { symbol } = useParams();
  const [tf,setTf] = useState("1M");
  const [qty,setQty] = useState("");
  const [position,setPosition] = useState(null);

  function generateData(){

    let base = 120 + Math.random()*80;

    let points = 40;
    let volatility = 3;

    if(tf === "1D"){ points = 20; volatility = 2; }
    if(tf === "1W"){ points = 30; volatility = 3; }
    if(tf === "1M"){ points = 40; volatility = 5; }
    if(tf === "1Y"){ points = 60; volatility = 8; }

    const arr = [];

    for(let i=0;i<points;i++){
      base += (Math.random()-0.5)*volatility;
      arr.push(Number(base.toFixed(2)));
    }

    return arr;
  }

  const prices = generateData();

  const currentPrice = prices[prices.length - 1];
  const openPrice = prices[0];
  const change = ((currentPrice - openPrice) / openPrice * 100).toFixed(2);
  const isUp = change > 0;

  const data = {
    labels: prices.map((_,i)=>i),
    datasets:[
      {
        label:symbol,
        data:prices,
        borderColor:"#00ff88",
        backgroundColor:"rgba(0,255,136,0.15)",
        fill:true,
        tension:0.35,
        pointRadius:0
      }
    ]
  };

  const options = {
    responsive:true,
    plugins:{
      legend:{ labels:{color:"white"} }
    },
    scales:{
      x:{ ticks:{color:"gray"}, grid:{color:"#111"} },
      y:{ ticks:{color:"gray"}, grid:{color:"#111"} }
    }
  };

  function buyStock(){
  if(!qty) return;

  const trade = {
    symbol,
    qty:Number(qty),
    price:currentPrice
  };

  const existing = JSON.parse(localStorage.getItem("trades") || "[]");

  localStorage.setItem(
    "trades",
    JSON.stringify([...existing, trade])
  );

  setPosition(trade);
  setQty("");
}
  let pnl = 0;

  if(position){
    pnl = ((currentPrice - position.price) * position.qty).toFixed(2);
  }

  return(
    <div style={{
      background:"#05070f",
      minHeight:"100vh",
      padding:"40px",
      color:"white"
    }}>

      {/* HEADER */}
      <div style={{marginBottom:"20px"}}>
        <h1 style={{marginBottom:"5px"}}>{symbol}</h1>

        <div style={{
          fontSize:"42px",
          fontWeight:"600"
        }}>
          ${currentPrice}
        </div>

        <div style={{
          color: isUp ? "#00ff88" : "#ff4d4d",
          fontWeight:"bold",
          marginTop:"4px"
        }}>
          {isUp ? "▲" : "▼"} {change}%
        </div>
      </div>

      {/* TIMEFRAME */}
      <div style={{marginBottom:"20px"}}>
        {["1D","1W","1M","1Y"].map(t=>(
          <button
            key={t}
            onClick={()=>setTf(t)}
            style={{
              marginRight:"10px",
              padding:"8px 16px",
              background: tf===t ? "#00ff88" : "#111827",
              color:"white",
              border:"none",
              borderRadius:"8px",
              cursor:"pointer"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* GRAPH */}
      <div style={{
        background:"#0b1220",
        padding:"30px",
        borderRadius:"20px",
        maxWidth:"1100px",
        marginBottom:"30px"
      }}>
        <Line data={data} options={options}/>
      </div>

      {/* BUY PANEL */}
      <div style={{
        background:"#0b1220",
        padding:"25px",
        borderRadius:"20px",
        maxWidth:"400px"
      }}>
        <h3>Trade Simulator</h3>

        <input
          placeholder="Quantity"
          value={qty}
          onChange={e=>setQty(e.target.value)}
          style={{
            width:"100%",
            padding:"10px",
            marginTop:"10px",
            background:"#111827",
            color:"white",
            border:"none",
            borderRadius:"8px"
          }}
        />

        <button
          onClick={buyStock}
          style={{
            marginTop:"15px",
            width:"100%",
            padding:"10px",
            background:"#00ff88",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          BUY
        </button>

        {position && (
          <div style={{marginTop:"20px"}}>
            <p>Position: {position.qty} shares</p>
            <p>Entry Price: ${position.price}</p>

            <p style={{
              color: pnl>0 ? "#00ff88" : "#ff4d4d",
              fontWeight:"bold"
            }}>
              PnL: ${pnl}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}