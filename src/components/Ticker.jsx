import { useEffect, useRef } from "react";

export default function Ticker({ stocks }){

  const ref = useRef();

  useEffect(()=>{

    const el = ref.current;
    let pos = 0;

    function move(){
      pos -= 0.4;
      if(Math.abs(pos) >= el.scrollWidth/2){
        pos = 0;
      }
      el.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(move);
    }

    move();

  },[]);

  const loopData = [...stocks, ...stocks];

  return(
    <div style={{
      overflow:"hidden",
      background:"#020617",
      padding:"10px 0",
      borderBottom:"1px solid #111",
      marginBottom:"15px"
    }}>
      <div
        ref={ref}
        style={{
          display:"flex",
          gap:"40px",
          whiteSpace:"nowrap",
          willChange:"transform"
        }}
      >
        {loopData.map((s,i)=>{

          const pct = Number(s.percent);

          return(
            <span key={i} style={{color:"white"}}>
              {s.symbol}
              <span style={{
                marginLeft:"6px",
                color: pct>0 ? "#00ff88" : "#ff4d4d"
              }}>
                {pct>0?"▲":"▼"} {pct}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}