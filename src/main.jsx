import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Terminal from "./pages/Terminal";
import StockDetail from "./pages/StockDetail";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={
          <ProtectedRoute>
            <Terminal/>
          </ProtectedRoute>
        }/>

        <Route path="/stock/:symbol" element={
          <ProtectedRoute>
            <StockDetail/>
          </ProtectedRoute>
        }/>

        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Portfolio/>
          </ProtectedRoute>
        }/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);