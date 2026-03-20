import { useEffect, useState } from "react";

export default function usePortfolio(){

  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(()=>{
    localStorage.setItem("portfolio", JSON.stringify(positions));
  },[positions]);

  const buyStock = (symbol, price, qty) => {

    setPositions(prev => {

      const existing = prev.find(p => p.symbol === symbol);

      if(existing){
        return prev.map(p =>
          p.symbol === symbol
            ? {
                ...p,
                qty: p.qty + qty,
                avgPrice:
                  ((p.avgPrice * p.qty) + (price * qty)) /
                  (p.qty + qty)
              }
            : p
        );
      }

      return [
        ...prev,
        { symbol, qty, avgPrice: price }
      ];
    });

  };

  const sellStock = (symbol, qty) => {

    setPositions(prev =>
      prev
        .map(p =>
          p.symbol === symbol
            ? { ...p, qty: p.qty - qty }
            : p
        )
        .filter(p => p.qty > 0)
    );

  };

  return { positions, buyStock, sellStock };
}