import { useNavigate } from "react-router-dom";
import logo from "../assets/tradepulse-logo.png";

export default function Navbar(){

  const navigate = useNavigate();

  return(
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"14px 30px",
      background:"#020617",
      borderBottom:"1px solid rgba(255,255,255,0.05)"
    }}>

      <img
        src={logo}
        style={{height:"55px",cursor:"pointer"}}
        onClick={()=>navigate("/")}
      />

      <div>

        <button
          onClick={()=>navigate("/portfolio")}
          style={{
            marginRight:"12px",
            padding:"10px 18px",
            background:"#111827",
            color:"white",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer"
          }}
        >
          Portfolio
        </button>

        <button
          style={{
            padding:"10px 18px",
            background:"#ff4d4d",
            color:"white",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}