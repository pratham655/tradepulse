export default function GainersLosers({ stocks }){

  if(!stocks || stocks.length === 0) return null;

  const sorted = [...stocks].sort(
    (a,b)=>Number(b.percent) - Number(a.percent)
  );

  const gainers = sorted.slice(0,5);
  const losers = sorted.slice(-5).reverse();

  return(
    <>
      <div style={{
        background:"#0b1220",
        padding:"20px",
        borderRadius:"18px",
        color:"white"
      }}>
        <h3>Top Gainers</h3>

        {gainers.map(g=>(
          <div key={g.symbol} style={{
            display:"flex",
            justifyContent:"space-between",
            marginTop:"10px"
          }}>
            <span>{g.symbol}</span>
            <span style={{color:"#00ff88"}}>
              ▲ {g.percent}%
            </span>
          </div>
        ))}
      </div>

      <div style={{
        background:"#0b1220",
        padding:"20px",
        borderRadius:"18px",
        color:"white"
      }}>
        <h3>Top Losers</h3>

        {losers.map(g=>(
          <div key={g.symbol} style={{
            display:"flex",
            justifyContent:"space-between",
            marginTop:"10px"
          }}>
            <span>{g.symbol}</span>
            <span style={{color:"#ff4d4d"}}>
              ▼ {g.percent}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
}