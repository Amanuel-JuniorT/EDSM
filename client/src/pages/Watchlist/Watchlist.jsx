/*
  Watchlist.jsx - Watchlist page for EDSM
  --------------------------------------
  - Shows user's watchlist, allows adding/removing stocks.
  - For backend/frontend devs: Add API integration, watchlist logic, or notifications here as needed.
*/
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock watchlist data
const initialWatchlist = [
  { symbol: 'ETHBANK2', name: 'Dashen Bank', price: 1100 },
  { symbol: 'ETHBANK', name: 'Commercial Bank of Ethiopia', price: 1200.5 },
  { symbol: 'ETHAIR', name: 'Ethiopian Airlines', price: 2500.04 },
  { symbol: 'ETHSUGAR', name: 'Ethiopian Sugar Corporation', price: 450.75 },
];

export default function Watchlist() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromDashboard = location.state && location.state.fromDashboard;
  const [search, setSearch] = useState('');
  const [watchlist] = useState(initialWatchlist);

  const filtered = watchlist.filter(
    item =>
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="watchlist-page" style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 0' }}>
      {fromDashboard && (
        <button
          className="btn btn-outline"
          style={{ marginBottom: 18 }}
          onClick={() => navigate('/dashboard')}
        >
          <i className="fas fa-arrow-left" style={{ marginRight: 8 }}></i> Back to Dashboard
        </button>
      )}
      <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 18 }}>My Watchlist</h1>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <i className="fas fa-search" style={{ color: '#bbb', fontSize: '1.1em', marginLeft: 6 }}></i>
        <input
          type="text"
          placeholder="Search watchlist..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 320, padding: '10px 16px', borderRadius: 8, border: '1.5px solid #e3e8ee', background: '#fafbfc', fontSize: '1em' }}
        />
      </div>
      <table className="watchlist-table" style={{ width: '100%', background: '#f9fbfd', borderRadius: 12, boxShadow: '0 1px 6px #e3e8ee', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: '#f5f7fa', color: '#222', fontWeight: 700 }}>
            <th style={{ textAlign: 'left', padding: '14px 18px' }}>Stock</th>
            <th style={{ textAlign: 'left', padding: '14px 18px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '14px 18px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.symbol} style={{ background: '#fff', borderBottom: '1.5px solid #f0f2f5' }}>
              <td style={{ fontWeight: 700, padding: '14px 18px' }}>{item.symbol}</td>
              <td style={{ padding: '14px 18px' }}>{item.name}</td>
              <td style={{ padding: '14px 18px' }}>ETB {item.price?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 