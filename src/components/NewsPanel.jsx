import { useEffect, useState } from "react";

export default function NewsPanel(){

  const [news,setNews] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    fetch(`https://gnews.io/api/v4/search?q=stock&lang=en&max=5&apikey=076d9f7bb2d21e9a11b4012d4d2ea135`)
      .then(res=>res.json())
      .then(data=>{
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(()=>{
        setLoading(false);
      });

  },[]);

  return (
    <div style={{
      background:"#0b1220",
      padding:"20px",
      borderRadius:"12px",
      color:"white",
      marginBottom:"20px"
    }}>
      <h3>📰 Live Market News</h3>

      {loading && <p>Loading news...</p>}

      {!loading && news.map((n,i)=>(
        <div
          key={i}
          style={{
            padding:"10px 0",
            borderBottom:"1px solid #111",
            cursor:"pointer"
          }}
          onClick={()=>window.open(n.url,"_blank")}
        >
          <div>{n.title}</div>

          <span style={{
            color:"lime",
            fontSize:"12px"
          }}>
            {n.source.name}
          </span>
        </div>
      ))}

      {!loading && news.length===0 && <p>No news found</p>}

    </div>
  );
}