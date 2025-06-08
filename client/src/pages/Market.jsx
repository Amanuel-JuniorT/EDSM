/*
  Market.jsx - Market overview page for EDSM
  -----------------------------------------
  - Shows market data, filters, and allows navigation to stock details.
  - For backend/frontend devs: Add API integration, live data, or filters here as needed.
*/
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStocksStore } from "../store/useStocksStore";

// const stocks = [
//   {
//     symbol: "ETHAIR",
//     name: "Ethiopian Airlines",
//     price: 2500.04,
//     change: "+2.0%",
//     marketCap: "ETB 45.2B",
//     inWatchlist: true,
//     category: "Top Movers",
//   },
//   {
//     symbol: "ETHCOM",
//     name: "Ethio Telecom",
//     price: 656.0,
//     change: "-23.1%",
//     marketCap: "ETB 12.8B",
//     inWatchlist: false,
//     category: "Technology",
//   },
//   {
//     symbol: "ETHBANK",
//     name: "Commercial Bank of Ethiopia",
//     price: 1200.5,
//     change: "+5.2%",
//     marketCap: "ETB 28.4B",
//     inWatchlist: true,
//     category: "Finance",
//   },
//   {
//     symbol: "ETHSUGAR",
//     name: "Ethiopian Sugar Corporation",
//     price: 450.75,
//     change: "-1.5%",
//     marketCap: "ETB 8.9B",
//     inWatchlist: true,
//     category: "Energy",
//   },
//   {
//     symbol: "ETHMIN",
//     name: "Ethiopian Mining Corporation",
//     price: 890.25,
//     change: "+3.8%",
//     marketCap: "ETB 15.6B",
//     inWatchlist: false,
//     category: "Energy",
//   },
//   {
//     symbol: "ETHOIL",
//     name: "Ethiopian Oil & Gas",
//     price: 1340.0,
//     change: "+1.2%",
//     marketCap: "ETB 20.1B",
//     inWatchlist: false,
//     category: "Energy",
//   },
//   {
//     symbol: "ETHAGR",
//     name: "Ethiopian Agriculture",
//     price: 780.5,
//     change: "-0.8%",
//     marketCap: "ETB 10.2B",
//     inWatchlist: false,
//     category: "Finance",
//   },
//   {
//     symbol: "ETHBANK2",
//     name: "Dashen Bank",
//     price: 1100.0,
//     change: "+2.5%",
//     marketCap: "ETB 18.7B",
//     inWatchlist: true,
//     category: "Finance",
//   },
//   {
//     symbol: "ETHFOOD",
//     name: "Ethiopian Food Processing",
//     price: 320.0,
//     change: "+0.5%",
//     marketCap: "ETB 5.3B",
//     inWatchlist: false,
//     category: "Technology",
//   },
//   {
//     symbol: "ETHPHAR",
//     name: "Ethiopian Pharmaceuticals",
//     price: 670.0,
//     change: "-2.2%",
//     marketCap: "ETB 7.8B",
//     inWatchlist: false,
//     category: "Technology",
//   },
//   {
//     symbol: "ETHEM",
//     name: "Ethiopian Cement",
//     price: 540.0,
//     change: "+4.1%",
//     marketCap: "ETB 6.2B",
//     inWatchlist: false,
//     category: "Energy",
//   },
//   {
//     symbol: "ETHCON",
//     name: "Ethiopian Construction",
//     price: 980.0,
//     change: "+0.0%",
//     marketCap: "ETB 9.5B",
//     inWatchlist: false,
//     category: "Technology",
//   },
// ];

const sector = ["All", "Top Movers", "Technology", "Finance", "Other"];

export let marketSearchInputRef = null;

export default function Market() {
  const { stocks, fetchStocks } = useStocksStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [stockList, setStockList] = useState(stocks);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const fromDashboard = location.state && location.state.fromDashboard;
  const [toast, setToast] = useState({ show: false, message: "", undo: null });
  const toastTimeout = useRef(null);
  useEffect(() => {
    marketSearchInputRef = searchInputRef;
    fetchStocks();
  }, [fetchStocks]);

  if (stocks.length !== 0 && stockList.length === 0) {
    setStockList(stocks);
  }

  console.log({ stocks });

  const filteredStocks = stockList.filter((stock) => {
    if (activeCategory === "All") {
      console.log("Filtering all stocks");

      return (
        stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
        stock.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeCategory === "Top Movers")
      return (
        !stock.change.toString().startsWith("-") &&
        (stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
          stock.name.toLowerCase().includes(search.toLowerCase()))
      );
    return (
      stock.sector === activeCategory &&
      (stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
        stock.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  console.log({ filteredStocks });

  // Toggle watchlist status
  const toggleWatchlist = (symbol, e) => {
    e.stopPropagation();
    setStockList((prev) => {
      const updated = prev.map((stock) =>
        stock.symbol === symbol
          ? { ...stock, inWatchlist: !stock.inWatchlist }
          : stock
      );
      const stock = prev.find((s) => s.symbol === symbol);
      // Show toast
      setToast({
        show: true,
        message: !stock.inWatchlist
          ? `Added ${stock.symbol} to watchlist`
          : `Removed ${stock.symbol} from watchlist`,
        undo: () => {
          setStockList((current) =>
            current.map((s) =>
              s.symbol === symbol ? { ...s, inWatchlist: stock.inWatchlist } : s
            )
          );
          setToast({ show: false, message: "", undo: null });
        },
      });
      // Auto-dismiss toast
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(
        () => setToast({ show: false, message: "", undo: null }),
        3500
      );
      return updated;
    });
  };

  // Compute the live watchlist from stockList
  const liveWatchlist = stockList.filter((stock) => stock.inWatchlist);

  useEffect(
    () => () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    },
    []
  );

  return (
    <div className="market-page">
      {/* Back to Dashboard button if navigated from dashboard */}
      {fromDashboard && (
        <button
          className="btn btn-outline"
          style={{ marginBottom: 18 }}
          onClick={() => navigate("/dashboard")}
        >
          <i className="fas fa-arrow-left" style={{ marginRight: 8 }}></i> Back
          to Dashboard
        </button>
      )}
      {/* Toast notification */}
      {toast.show && (
        <div
          className="toast show"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 2000,
            minWidth: 220,
            background: "#222",
            color: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>{toast.message}</span>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#4fc3f7",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1em",
              marginLeft: 8,
            }}
            onClick={() => toast.undo && toast.undo()}
          >
            Undo
          </button>
        </div>
      )}
      <div className="market-header">
        <h1>Market</h1>
      </div>
      <div className="market-filters">
        {sector.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="text"
          className="market-search"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
        />
      </div>
      <div className="market-layout">
        <div className="market-main">
          <div className="card table-responsive market-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 48, textAlign: "center" }}></th>
                  <th>Stock Name</th>
                  <th>Last Price</th>
                  <th>Change (%)</th>
                  <th>Market Cap</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.length === 0 ? (
                  <tr className="loading-spinner" />
                ) : (
                  filteredStocks.map((stock, idx) => (
                    <tr
                      key={idx}
                      className="stock-row"
                      onClick={() =>
                        navigate(`/stock/${stock.symbol}`, {
                          state: {
                            fromMarket: true,
                            ...(fromDashboard ? { fromDashboard: true } : {}),
                          },
                        })
                      }
                    >
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <button
                          className="star-btn"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={(e) => toggleWatchlist(stock.symbol, e)}
                          title={
                            stock.inWatchlist
                              ? "Remove from Watchlist"
                              : "Add to Watchlist"
                          }
                          aria-label={
                            stock.inWatchlist
                              ? "Remove from Watchlist"
                              : "Add to Watchlist"
                          }
                        >
                          <i
                            className={
                              stock.inWatchlist ? "fas fa-star" : "far fa-star"
                            }
                            style={{
                              color: stock.inWatchlist ? "#ffc107" : "#bbb",
                              fontSize: "1.25em",
                              transition: "color 0.2s",
                            }}
                          ></i>
                        </button>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{stock.symbol}</div>
                        <div
                          style={{
                            color: "var(--light-text)",
                            fontSize: "0.95em",
                          }}
                        >
                          {stock.name}
                        </div>
                      </td>
                      <td>ETB {stock.unitPrice.toLocaleString()}</td>
                      <td
                        className={
                          stock.change.toString().startsWith("-")
                            ? "negative"
                            : "positive"
                        }
                      >
                        {stock.change}
                      </td>
                      <td>{stock.marketCap}</td>
                      <td>
                        <i
                          className="fas fa-chevron-right"
                          style={{
                            color: "#bbb",
                            marginLeft: 10,
                            fontSize: "1em",
                            verticalAlign: "middle",
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="watchlist-panel">
          <div
            className="card"
            style={{
              background: "var(--card-bg)",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 24px 0 var(--shadow-color)",
              borderRadius: 18,
            }}
          >
            <div className="card-header">
              <div className="card-title">Your Watchlist</div>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {liveWatchlist.length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          color: "#bbb",
                          textAlign: "center",
                          padding: 18,
                        }}
                      >
                        No stocks in watchlist.
                      </td>
                    </tr>
                  ) : (
                    liveWatchlist.map((item, idx) => (
                      <tr
                        key={idx}
                        className="stock-row"
                        onClick={() =>
                          navigate(`/stock/${item.symbol}`, {
                            state: { fromMarket: true },
                          })
                        }
                      >
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            position: "relative",
                          }}
                        >
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "#e57373",
                              fontSize: "1.1em",
                              marginRight: 8,
                              cursor: "pointer",
                              padding: 2,
                              borderRadius: 4,
                            }}
                            title="Remove from Watchlist"
                            aria-label="Remove from Watchlist"
                            onClick={(e) => {
                              e.stopPropagation();
                              setStockList((prev) => {
                                prev.find((s) => s.symbol === item.symbol);
                                const updated = prev.map((s) =>
                                  s.symbol === item.symbol
                                    ? { ...s, inWatchlist: false }
                                    : s
                                );
                                setToast({
                                  show: true,
                                  message: `Removed ${item.symbol} from watchlist`,
                                  undo: () => {
                                    setStockList((current) =>
                                      current.map((s) =>
                                        s.symbol === item.symbol
                                          ? { ...s, inWatchlist: true }
                                          : s
                                      )
                                    );
                                    setToast({
                                      show: false,
                                      message: "",
                                      undo: null,
                                    });
                                  },
                                });
                                if (toastTimeout.current)
                                  clearTimeout(toastTimeout.current);
                                toastTimeout.current = setTimeout(
                                  () =>
                                    setToast({
                                      show: false,
                                      message: "",
                                      undo: null,
                                    }),
                                  3500
                                );
                                return updated;
                              });
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.symbol}</div>
                            <div
                              style={{
                                color: "var(--light-text)",
                                fontSize: "0.95em",
                              }}
                            >
                              {item.name}
                            </div>
                          </div>
                        </td>
                        <td>ETB {item.unitPrice?.toLocaleString()}</td>
                        <td>
                          <i
                            className="fas fa-chevron-right"
                            style={{
                              color: "#bbb",
                              marginLeft: 10,
                              fontSize: "1em",
                              verticalAlign: "middle",
                            }}
                          ></i>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
