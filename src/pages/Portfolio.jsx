import usePortfolio from "../hooks/usePortfolio";

export default function Portfolio(){

  const { positions } = usePortfolio();

  const portfolioData = positions.map(p => {

    const live = p.avgPrice + (Math.random()-0.5)*20;

    return {
      ...p,
      livePrice: live,
      invested: p.avgPrice * p.qty,
      current: live * p.qty,
      pnl: (live - p.avgPrice) * p.qty
    };

  });

  const totalInvested = portfolioData.reduce((s,p)=>s+p.invested,0);
  const totalCurrent = portfolioData.reduce((s,p)=>s+p.current,0);
  const totalPnL = totalCurrent - totalInvested;

  return (
    <div style={{
      background:"#05070f",
      minHeight:"100vh",
      padding:"40px",
      color:"white"
    }}>

      <h1>Portfolio</h1>

      <h3>Total Invested: ${totalInvested.toFixed(2)}</h3>
      <h3>Current Value: ${totalCurrent.toFixed(2)}</h3>

      <h2 style={{color:totalPnL>0?"lime":"red"}}>
        P&L: ${totalPnL.toFixed(2)}
      </h2>

      <div style={{marginTop:"30px"}}>
        {portfolioData.map(p => (
          <div key={p.symbol} style={{
            background:"#0b1220",
            padding:"15px",
            marginBottom:"12px",
            borderRadius:"12px"
          }}>
            <strong>{p.symbol}</strong> — Qty: {p.qty}
            <br/>
            Avg: ${p.avgPrice.toFixed(2)}
            <br/>
            Live: ${p.livePrice.toFixed(2)}
            <br/>
            <span style={{color:p.pnl>0?"lime":"red"}}>
              P&L: ${p.pnl.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}