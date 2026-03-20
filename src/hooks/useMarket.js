import { STOCK_SYMBOLS } from "../data/stocks";

export default function useMarket(){

  return STOCK_SYMBOLS.map(sym => {

    const price = (100 + Math.random()*700).toFixed(2);
    const percent = (Math.random()*6 - 3).toFixed(2);

    return {
      symbol: sym,
      name: sym + " Corp",
      price,
      percent
    };

  });

}