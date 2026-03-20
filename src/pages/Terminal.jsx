import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMarket from "../hooks/useMarket";
import useWatchlist from "../hooks/useWatchlist";

import Navbar from "../components/Navbar";
import Ticker from "../components/Ticker";
import VolumeMovers from "../components/VolumeMovers";
import MarketIndices from "../components/MarketIndices";
import NewsPanel from "../components/NewsPanel";
import PortfolioSummary from "../components/PortfolioSummary";
import GainersLosers from "../components/GainersLosers";

export default function Terminal(){

  const stocks = useMarket() || [];
  const { watchlist, toggleStock } = useWatchlist();
  const [query,setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = stocks.filter(s =>
    (s.name || "").toLowerCase().includes(query.toLowerCase()) ||
    (s.symbol || "").toLowerCase().includes(query.toLowerCase())
  );

  return(
    <div style={{background:"#05070f",minHeight:"100vh"}}>

      <Navbar/>

      <div style={{padding:"30px"}}>

        {stocks.length>0 && <Ticker stocks={stocks}/>}

        {/* Volume Movers */}
        <VolumeMovers stocks={stocks}/>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginTop:"20px"
        }}>
          <h2 style={{color:"white"}}>Market Dashboard</h2>

          <input
            placeholder="Search stocks..."
            style={{
              width:"260px",
              padding:"12px",
              background:"#111827",
              color:"white",
              border:"none",
              borderRadius:"10px"
            }}
            onChange={e=>setQuery(e.target.value)}
          />
        </div>

        <div style={{marginTop:"20px"}}>
          <MarketIndices/>
        </div>

        <div style={{marginTop:"20px"}}>
          <NewsPanel/>
        </div>

        {/* Analytics Row */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr 1fr",
          gap:"20px",
          marginTop:"20px"
        }}>
          <PortfolioSummary/>
          <GainersLosers stocks={stocks}/>
        </div>

        {/* Watchlist */}
        <div style={{marginTop:"25px",color:"white"}}>
          ⭐ Watchlist
        </div>

        <div style={{marginBottom:"20px"}}>
          {watchlist.length===0 && (
            <span style={{color:"gray"}}>No stocks added</span>
          )}

          {watchlist.map(w=>(
            <span key={w} style={{
              background:"#111827",
              padding:"6px 12px",
              borderRadius:"8px",
              marginRight:"10px",
              color:"white"
            }}>
              {w}
            </span>
          ))}
        </div>

        {/* Stock Grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
          gap:"24px"
        }}>
          {filtered.slice(0,40).map(s=>{

            const pct = Number(s.percent || 0);

            return(
              <div
                key={s.symbol}
                onClick={()=>navigate(`/stock/${s.symbol}`)}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.transform="translateY(-6px)";
                  e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.9)";
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.transform="translateY(0px)";
                  e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.6)";
                }}
                style={{
                  background:"rgba(15,23,42,0.6)",
                  backdropFilter:"blur(12px)",
                  padding:"24px",
                  borderRadius:"20px",
                  cursor:"pointer",
                  position:"relative",
                  border:"1px solid rgba(255,255,255,0.05)",
                  transition:"0.25s",
                  boxShadow:"0 10px 30px rgba(0,0,0,0.6)"
                }}
              >
                <div
                  onClick={(e)=>{
                    e.stopPropagation();
                    toggleStock(s.symbol);
                  }}
                  style={{
                    position:"absolute",
                    right:"14px",
                    top:"14px",
                    fontSize:"18px",
                    color:watchlist.includes(s.symbol)?"gold":"#334155"
                  }}
                >
                  ★
                </div>

                <h2 style={{color:"white"}}>{s.symbol}</h2>

                <p style={{color:"#94a3b8",fontSize:"13px"}}>
                  {s.name}
                </p>

                <div style={{
                  marginTop:"14px",
                  fontWeight:"bold",
                  color:
                    pct>2?"#00ff88":
                    pct>0.7?"lime":
                    pct<-2?"#ff4d4d":
                    pct<-0.7?"red":"orange"
                }}>
                  {pct>2?"STRONG BUY":
                   pct>0.7?"BUY":
                   pct<-2?"STRONG SELL":
                   pct<-0.7?"SELL":"HOLD"}
                </div>

                <div style={{
                  color:"white",
                  fontSize:"28px",
                  marginTop:"6px"
                }}>
                  ${s.price}
                </div>

                <div style={{color:pct>0?"lime":"red"}}>
                  {pct>0?"▲":"▼"} {pct}%
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}