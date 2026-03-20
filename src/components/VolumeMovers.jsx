export default function VolumeMovers({ stocks }){

  if(!stocks || stocks.length === 0) return null;

  const movers = [...stocks]
    .sort(()=>0.5 - Math.random())
    .slice(0,6);

  return(
    <div style={{
      display:"flex",
      gap:"15px",
      marginTop:"15px",
      marginBottom:"10px",
      overflowX:"auto"
    }}>
      {movers.map(m=>(
        <div key={m.symbol} style={{
          minWidth:"160px",
          background:"#0b1220",
          padding:"15px",
          borderRadius:"14px",
          color:"white"
        }}>
          <h4>{m.symbol}</h4>
          <p style={{fontSize:"12px",color:"#94a3b8"}}>High Volume</p>
          <p style={{
            color:m.percent>0?"#00ff88":"#ff4d4d",
            fontWeight:"bold"
          }}>
            {m.percent>0?"▲":"▼"} {m.percent}%
          </p>
        </div>
      ))}
    </div>
  );
}