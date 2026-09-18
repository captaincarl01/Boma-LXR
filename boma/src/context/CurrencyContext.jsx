import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

// Fallback rates used only if the live API fails or hasn't loaded yet
const FALLBACK_RATES = {
  USD: { symbol: "$", rate: 1 },
  NGN: { symbol: "₦", rate: 1550 },
  GBP: { symbol: "£", rate: 0.78 },
};

const RATES_CACHE_KEY = "boma-lxr-exchange-rates";
const RATES_CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 hours — no need to fetch more often than this

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);

  useEffect(() => {
    async function loadRates() {
      // Check cache first — avoids hitting the API on every single page load
      try {
        const cached = localStorage.getItem(RATES_CACHE_KEY);
        if (cached) {
          const { rates: cachedRates, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < RATES_CACHE_DURATION) {
            setRates(cachedRates);
            setRatesLoading(false);
            return;
          }
        }
      } catch {
        // Cache read failed — fall through to fetching fresh
      }

      // Fetch fresh rates — this API is free, no key required
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();

        if (data?.rates?.NGN && data?.rates?.GBP) {
          const freshRates = {
            USD: { symbol: "$", rate: 1 },
            NGN: { symbol: "₦", rate: data.rates.NGN },
            GBP: { symbol: "£", rate: data.rates.GBP },
          };
          setRates(freshRates);
          localStorage.setItem(
            RATES_CACHE_KEY,
            JSON.stringify({ rates: freshRates, timestamp: Date.now() })
          );
        }
      } catch {
        // API failed — silently keep using FALLBACK_RATES, no need to alarm the customer
      } finally {
        setRatesLoading(false);
      }
    }

    loadRates();
  }, []);

  const formatPrice = (usdPrice) => {
    const { symbol, rate } = rates[currency];
    const converted = usdPrice * rate;
    const formatted =
      currency === "NGN"
        ? Math.round(converted).toLocaleString("en-NG")
        : converted.toFixed(2);
    return `${symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, ratesLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);