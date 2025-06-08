import { useState } from "react";

// Watchlist.jsx - User's stock watchlist page
const watchlist = [
  { symbol: "ETHBANK2", name: "Dashen Bank", price: 1100.0 },
  { symbol: "ETHBANK", name: "Commercial Bank of Ethiopia", price: 1200.5 },
  { symbol: "ETHAIR", name: "Ethiopian Airlines", price: 2500.04 },
  { symbol: "ETHSUGAR", name: "Ethiopian Sugar Corporation", price: 450.75 },
];

export default function Watchlist() {
  // State for search input
  const [search, setSearch] = useState("");
  // Filtered list based on search
  const filtered = watchlist.filter(
    (item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="watchlist-page">
      {/* Header */}
      <div className="market-header">
        <h1>My Watchlist</h1>
      </div>
      {/* Search bar */}
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="text"
          className="market-search"
          placeholder="Search watchlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Watchlist table */}
      <div
        className="card table-responsive market-table"
        style={{ marginTop: 24 }}
      >
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                  No stocks found.
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{item.symbol}</td>
                  <td
                    style={{ color: "var(--light-text)", fontSize: "0.95em" }}
                  >
                    {item.name}
                  </td>
                  <td>ETB {item.price.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
