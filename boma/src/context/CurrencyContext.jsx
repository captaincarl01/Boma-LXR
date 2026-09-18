import { createContext, useContext, useState } from "react";

// TODO: swap these for live rates via an exchange-rate API if you want real-time accuracy
const EXCHANGE_RATES = {
  USD: { symbol: "$", rate: 1 },
  NGN: { symbol: "₦", rate: 1550 },
  GBP: { symbol: "£", rate: 0.78 },
};

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  const formatPrice = (usdPrice) => {
    const { symbol, rate } = EXCHANGE_RATES[currency];
    const converted = usdPrice * rate;
    const formatted =
      currency === "NGN"
        ? Math.round(converted).toLocaleString("en-NG")
        : converted.toFixed(2);
    return `${symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);