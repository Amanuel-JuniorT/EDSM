import React, { createContext, useState, useEffect } from "react";
import stocksData from "../data/stocks";

/*
  AppContext.jsx - Global app state for EDSM
  -----------------------------------------
  - Provides portfolio, balance, watchlist, and stock data to the app.
  - Integrates with localStorage for persistence.
  - For backend/frontend devs: Add API integration or backend sync logic here if needed.
*/

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() =>
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [ownedAssets, setOwnedAssets] = useState(() =>
    JSON.parse(localStorage.getItem("ownedAssets")) || []
  );
  const [stocks, setStocks] = useState(stocksData);
  const [portfolioSummary, setPortfolioSummary] = useState({
    value: 40340.32,
    gain: 233.4,
    gainPercent: 3.2,
    investment: 10000,
    cash: 41137.32,
    todayReturn: 123.32,
  });
  const [balance, setBalance] = useState(41137.32);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("ownedAssets", JSON.stringify(ownedAssets));
  }, [ownedAssets]);

  return (
    <AppContext.Provider
      value={{
        watchlist,
        setWatchlist,
        ownedAssets,
        setOwnedAssets,
        stocks,
        setStocks,
        portfolioSummary,
        setPortfolioSummary,
        balance,
        setBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
} 