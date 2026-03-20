import { BrowserRouter, Routes, Route } from "react-router-dom";
import Terminal from "./pages/Terminal";
import Portfolio from "./pages/Portfolio";
import StockDetail from "./pages/StockDetail";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Terminal />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}