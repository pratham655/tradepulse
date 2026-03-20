import { useNavigate } from "react-router-dom";

export default function Sidebar(){

  const navigate = useNavigate();

  return (
    <div style={{
      width:"220px",
      background:"#020617",
      color:"white",
      height:"100vh",
      padding:"20px",
      flexShrink:0
    }}>
      <h2 style={{marginBottom:"30px"}}>TradePulse</h2>

      <div style={{marginBottom:"20px", cursor:"pointer"}} onClick={()=>navigate("/")}>
        Dashboard
      </div>

      <div style={{marginBottom:"20px", cursor:"pointer"}} onClick={()=>navigate("/portfolio")}>
        Portfolio
      </div>

      <div style={{cursor:"pointer"}} onClick={()=>{
        localStorage.removeItem("auth");
        navigate("/login");
      }}>
        Logout
      </div>

    </div>
  );
}