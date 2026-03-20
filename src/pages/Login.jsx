import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/tradepulselogo.jpg";

export default function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [generatedOtp,setGeneratedOtp] = useState(null);
  const [step,setStep] = useState(1);

  function sendOtp(){

    if(!email) return alert("Enter email");

    const code = Math.floor(100000 + Math.random()*900000);
    setGeneratedOtp(code);
    setStep(2);

    alert("Simulated OTP: " + code); // interviewer trick
  }

  function verifyOtp(){

    if(Number(otp) === generatedOtp){

      localStorage.setItem("auth","true");
      navigate("/");

    }else{
      alert("Invalid OTP");
    }

  }

  return(
    <div style={{
      height:"100vh",
      background:"#05070f",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <div style={{
        background:"#0b1220",
        padding:"40px",
        borderRadius:"20px",
        width:"360px",
        textAlign:"center",
        color:"white"
      }}>

        <img src={logo} style={{height:"70px",marginBottom:"20px"}}/>

        <h2>TradePulse Secure Login</h2>

        {step===1 && (
          <>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              style={{
                width:"100%",
                marginTop:"20px",
                padding:"12px",
                background:"#111827",
                border:"none",
                color:"white",
                borderRadius:"8px"
              }}
            />

            <button
              onClick={sendOtp}
              style={{
                marginTop:"15px",
                width:"100%",
                padding:"12px",
                background:"#00ff88",
                border:"none",
                borderRadius:"10px",
                cursor:"pointer",
                fontWeight:"bold"
              }}
            >
              Send OTP
            </button>
          </>
        )}

        {step===2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={e=>setOtp(e.target.value)}
              style={{
                width:"100%",
                marginTop:"20px",
                padding:"12px",
                background:"#111827",
                border:"none",
                color:"white",
                borderRadius:"8px"
              }}
            />

            <button
              onClick={verifyOtp}
              style={{
                marginTop:"15px",
                width:"100%",
                padding:"12px",
                background:"#00ff88",
                border:"none",
                borderRadius:"10px",
                cursor:"pointer",
                fontWeight:"bold"
              }}
            >
              Verify OTP
            </button>
          </>
        )}

      </div>
    </div>
  );
}