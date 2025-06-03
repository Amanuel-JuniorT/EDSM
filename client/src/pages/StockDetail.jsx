/*
  StockDetail.jsx - Stock detail page for EDSM
  -------------------------------------------
  - Shows detailed info, chart (coming soon), and buy/sell widget for a stock.
  - For backend/frontend devs: Add API integration, chart logic, or buy/sell actions here as needed.
*/
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Expanded mock stock data for all symbols used in the app
const stocks = [
  { symbol: 'ETHAIR', name: 'Ethiopian Airlines', price: 2500.04, change: '+2.0%', marketCap: 'ETB 45.2B', volume: '1.2M', high52: 2700, low52: 1800, open: 2450, prevClose: 2480, dayRange: '2450 - 2520', pe: 18.2, eps: 137.5, dividend: '2.1%', industry: 'Airlines', sector: 'Transportation', ceo: 'Mesfin Tasew', employees: 17000, headquarters: 'Addis Ababa, Ethiopia', website: 'https://www.ethiopianairlines.com', description: 'Ethiopian Airlines is the flag carrier of Ethiopia and one of Africa\'s leading airlines.' },
  { symbol: 'ETHCOM', name: 'Ethio Telecom', price: 656.00, change: '-23.1%', marketCap: 'ETB 12.8B', volume: '2.3M', high52: 900, low52: 600, open: 670, prevClose: 679, dayRange: '650 - 670', pe: 12.5, eps: 52.1, dividend: '1.5%', industry: 'Telecommunications', sector: 'Technology', ceo: 'Frehiwot Tamiru', employees: 22000, headquarters: 'Addis Ababa, Ethiopia', website: 'https://www.ethiotelecom.et', description: 'Ethio Telecom is the largest telecom provider in Ethiopia.' },
  { symbol: 'ETHBANK', name: 'Commercial Bank of Ethiopia', price: 1200.50, change: '+5.2%', marketCap: 'ETB 28.4B', volume: '1.8M', high52: 1300, low52: 900, open: 1190, prevClose: 1180, dayRange: '1190 - 1210', pe: 15.7, eps: 80.2, dividend: '2.8%', industry: 'Banking', sector: 'Finance', ceo: 'Abie Sano', employees: 34000, headquarters: 'Addis Ababa, Ethiopia', website: 'https://www.combanketh.et', description: 'The Commercial Bank of Ethiopia is the largest commercial bank in Ethiopia.' },
  { symbol: 'ETHSUGAR', name: 'Ethiopian Sugar Corporation', price: 450.75, change: '-1.5%', marketCap: 'ETB 8.9B', description: 'Ethiopian Sugar Corporation is a major sugar producer in Ethiopia.' },
  { symbol: 'ETHBANK2', name: 'Dashen Bank', price: 1100.00, change: '+2.5%', marketCap: 'ETB 18.7B', description: 'Dashen Bank is one of the largest private banks in Ethiopia.' },
  { symbol: 'ETHMIN', name: 'Ethiopian Mining Corporation', price: 890.25, change: '+3.8%', marketCap: 'ETB 15.6B', description: 'Ethiopian Mining Corporation is a leading mining company in Ethiopia.' },
  { symbol: 'ETHOIL', name: 'Ethiopian Oil & Gas', price: 1340.00, change: '+1.2%', marketCap: 'ETB 20.1B', description: 'Ethiopian Oil & Gas is a major player in the energy sector.' },
  { symbol: 'ETHAGR', name: 'Ethiopian Agriculture', price: 780.50, change: '-0.8%', marketCap: 'ETB 10.2B', description: 'Ethiopian Agriculture is a key agricultural company.' },
  { symbol: 'ETHFOOD', name: 'Ethiopian Food Processing', price: 320.00, change: '+0.5%', marketCap: 'ETB 5.3B', description: 'Ethiopian Food Processing is a major food producer.' },
  { symbol: 'ETHPHAR', name: 'Ethiopian Pharmaceuticals', price: 670.00, change: '-2.2%', marketCap: 'ETB 7.8B', description: 'Ethiopian Pharmaceuticals is a leading pharma company.' },
  { symbol: 'ETHEM', name: 'Ethiopian Cement', price: 540.00, change: '+4.1%', marketCap: 'ETB 6.2B', description: 'Ethiopian Cement is a major cement producer.' },
  { symbol: 'ETHCON', name: 'Ethiopian Construction', price: 980.00, change: '+0.0%', marketCap: 'ETB 9.5B', description: 'Ethiopian Construction is a leading construction company.' },
];

const news = [
  { title: 'Ethiopian Airlines Expands Fleet', date: '2024-06-01', url: '#', summary: 'Ethiopian Airlines has announced the addition of 5 new aircraft to its fleet.' },
  { title: 'Ethio Telecom Launches 5G', date: '2024-05-28', url: '#', summary: 'Ethio Telecom has launched 5G services in Addis Ababa.' },
  { title: 'CBE Reports Record Profits', date: '2024-05-25', url: '#', summary: 'Commercial Bank of Ethiopia reports record profits for Q1 2024.' },
];

const related = [
  { symbol: 'ETHBANK', name: 'Commercial Bank of Ethiopia' },
  { symbol: 'ETHCOM', name: 'Ethio Telecom' },
  { symbol: 'ETHSUGAR', name: 'Ethiopian Sugar Corporation' },
];

function BuySellWidget({ stock }) {
  const [tab, setTab] = useState('buy');
  const [shares, setShares] = useState(1);
  const [cost, setCost] = useState(stock.price);
  const [sellReason, setSellReason] = useState('');

  // Update estimated cost when shares change
  React.useEffect(() => {
    setCost((shares > 0 ? shares : 0) * stock.price);
  }, [shares, stock.price]);

  // Determine if Sell button should be enabled
  const canSell = shares > 0 && sellReason.trim().length > 0;

  return (
    <div className="card" style={{ padding: 28, borderRadius: 18, minWidth: 300, maxWidth: 340, margin: '0 auto', background: 'var(--card-bg)', boxShadow: '0 4px 24px 0 var(--shadow-color)', border: '1.5px solid var(--border-color)' }}>
      <div style={{ display: 'flex', gap: 32, marginBottom: 18, borderBottom: '2px solid var(--border-color)' }}>
        <button onClick={() => setTab('buy')} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '1.13em', color: tab === 'buy' ? 'var(--primary-color)' : 'var(--text-muted)', borderBottom: tab === 'buy' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent', padding: '0 0 8px 0', cursor: 'pointer', transition: 'color 0.15s' }}>Buy</button>
        <button onClick={() => setTab('sell')} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '1.13em', color: tab === 'sell' ? 'var(--primary-color)' : 'var(--text-muted)', borderBottom: tab === 'sell' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent', padding: '0 0 8px 0', cursor: 'pointer', transition: 'color 0.15s' }}>Sell</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, fontSize: '1em', marginBottom: 4, display: 'block', color: 'var(--text-color)' }}>Stock</label>
        <input type="text" value={stock.symbol} disabled style={{ width: '100%', background: 'var(--input-bg)', border: '1.5px solid var(--border-color)', borderRadius: 8, padding: '10px 12px', fontWeight: 700, fontSize: '1.08em', color: 'var(--primary-color)', marginBottom: 0 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, fontSize: '1em', marginBottom: 4, display: 'block', color: 'var(--text-color)' }}>Number of Shares</label>
        <input type="number" min={1} value={shares} onChange={e => setShares(Number(e.target.value))} style={{ width: '100%', background: 'var(--input-bg)', border: '1.5px solid var(--border-color)', borderRadius: 8, padding: '10px 12px', fontWeight: 600, fontSize: '1.08em', color: 'var(--text-color)' }} />
      </div>
      {tab === 'sell' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, fontSize: '1em', marginBottom: 4, display: 'block', color: 'var(--text-color)' }}>Reason for Selling <span style={{ color: 'var(--danger-color)' }}>*</span></label>
          <textarea value={sellReason} onChange={e => setSellReason(e.target.value)} required rows={3} style={{ width: '100%', background: 'var(--input-bg)', border: '1.5px solid var(--border-color)', borderRadius: 8, padding: '10px 12px', fontWeight: 500, fontSize: '1.05em', resize: 'vertical', color: 'var(--text-color)' }} placeholder="Enter your reason..." />
        </div>
      )}
      <div style={{ marginBottom: 18, background: 'var(--hover-color)', borderRadius: 8, padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Estimated Cost</span>
        <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>ETB {cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>
      <button
        className="btn btn-primary"
        style={{ width: '100%', fontWeight: 700, fontSize: '1.13em', padding: '12px 0', borderRadius: 8, textAlign: 'center', display: 'block', background: 'var(--primary-color)', color: '#fff', border: 'none', boxShadow: '0 2px 8px 0 var(--shadow-color)', cursor: (tab === 'sell' ? canSell : shares >= 1) ? 'pointer' : 'not-allowed', opacity: (tab === 'sell' ? canSell : shares >= 1) ? 1 : 0.6, transition: 'background 0.15s, opacity 0.15s' }}
        disabled={tab === 'sell' ? !canSell : shares < 1}
      >
        <span style={{ display: 'block', textAlign: 'center', width: '100%' }}>{tab === 'buy' ? 'Buy Stock' : 'Sell Stock'}</span>
      </button>
    </div>
  );
}

export default function StockDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stock = stocks.find(s => s.symbol === symbol);

  // Check if navigated from dashboard or market
  const fromDashboard = location.state && location.state.fromDashboard;
  const fromMarket = location.state && location.state.fromMarket;

  console.log('StockDetail symbol:', symbol, 'stock:', stock);

  // Simulate loading state for future async fetch
  // const [loading, setLoading] = React.useState(false);
  // if (loading) return <div style={{ textAlign: 'center', marginTop: 60 }}>Loading...</div>;

  if (!stock) {
    return (
      <div className="stock-detail-page">
        <div className="card" style={{ padding: 32, margin: '2rem auto', maxWidth: 480, textAlign: 'center', color: '#e53935', background: 'var(--card-bg)', border: '1.5px solid var(--border-color)', boxShadow: '0 4px 24px 0 var(--shadow-color)', borderRadius: 18 }}>
          <h2>Stock Not Found</h2>
          <p>The stock symbol <b>{symbol}</b> does not exist.</p>
          <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ marginTop: 18 }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-detail-page" style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 0 2.5rem 0' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: fromDashboard || fromMarket ? 24 : 0 }}>
        {fromDashboard && (
          <button
            className="btn btn-outline"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: 8 }}></i> Back to Dashboard
          </button>
        )}
        {fromMarket && (
          <button
            className="btn btn-outline"
            onClick={() => navigate('/market')}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: 8 }}></i> Back to Market
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start', borderRadius: 18, boxShadow: '0 4px 24px 0 var(--shadow-color)', background: 'var(--card-bg)', border: '1.5px solid var(--border-color)', padding: '32px 32px 36px 32px' }}>
        {/* Left: Main Info, Chart, Company Info */}
        <div style={{ flex: 2, minWidth: 340, borderRight: '1.5px solid var(--border-color)', paddingRight: 40 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28, paddingBottom: 18, borderBottom: '1.5px solid var(--border-color)', background: 'var(--card-bg)', borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
            <div style={{ width: 64, height: 64, background: 'var(--hover-color)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: 'var(--primary-color)' }}>{stock.symbol[0]}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '2.1rem', marginBottom: 2, color: 'var(--text-color)' }}>{stock.name} <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>({stock.symbol})</span></div>
              <div style={{ color: 'var(--primary-color)', fontWeight: 500, fontSize: '1.05rem' }}>{stock.industry} &middot; {stock.sector}</div>
            </div>
          </div>
          {/* Price & Change */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 26 }}>
            <div style={{ fontSize: '2.3rem', fontWeight: 700, color: 'var(--text-color)' }}>ETB {stock.price.toLocaleString()}</div>
            <div style={{ fontWeight: 600, fontSize: '1.2rem', color: stock.change.startsWith('+') ? 'var(--success-color)' : 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className={`fas fa-arrow-${stock.change.startsWith('+') ? 'up' : 'down'}`}></i> {stock.change}
            </div>
          </div>
          {/* Key Stats */}
          <div
            style={{
              background: 'var(--hover-color)',
              borderRadius: 14,
              padding: '26px 36px',
              marginBottom: 36,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              rowGap: 20,
              columnGap: 0,
              alignItems: 'center',
              boxShadow: '0 1px 4px 0 var(--border-color)',
              border: '1.5px solid var(--border-color)',
              minWidth: 340,
              maxWidth: 700,
            }}
          >
            {/* First Row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>Market Cap:</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '1.08em' }}>{stock.marketCap}</span>
            </div>
            <div style={{ borderLeft: '1.5px solid var(--border-color)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>Volume:</span>
              <span>{stock.volume}</span>
            </div>
            <div style={{ borderLeft: '1.5px solid var(--border-color)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>52W High:</span>
              <span>{stock.high52}</span>
            </div>
            <div style={{ borderLeft: '1.5px solid var(--border-color)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>52W Low:</span>
              <span>{stock.low52}</span>
            </div>
            {/* Second Row */}
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>P/E:</span>
              <span>{stock.pe}</span>
            </div>
            <div style={{ marginTop: 10, borderLeft: '1.5px solid var(--border-color)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>EPS:</span>
              <span>{stock.eps}</span>
            </div>
            <div style={{ marginTop: 10, borderLeft: '1.5px solid var(--border-color)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 500, color: 'var(--text-color)' }}>Dividend:</span>
              <span>{stock.dividend}</span>
            </div>
            <div /> {/* Empty for grid alignment */}
          </div>
          {/* Chart Placeholder */}
          <div style={{ background: 'var(--hover-color)', borderRadius: 14, padding: 36, marginBottom: 36, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 12, color: 'var(--text-muted)' }}>Price Chart (1M)</div>
            <img src="https://placehold.co/600x180/1976d2/fff?text=Chart+Coming+Soon" alt="Chart" style={{ borderRadius: 8, width: '100%', maxWidth: 600 }} />
          </div>
          {/* Company Info & News */}
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', background: 'var(--card-bg)', borderRadius: 14, boxShadow: '0 1px 4px 0 var(--border-color)', border: '1.5px solid var(--border-color)', marginBottom: 18 }}>
            <div style={{ flex: 2, minWidth: 320, padding: '28px 28px 20px 28px' }}>
              <div style={{ fontWeight: 600, fontSize: '1.13rem', marginBottom: 8 }}>About {stock.name}</div>
              <div style={{ color: '#444', marginBottom: 12 }}>{stock.description}</div>
              <div style={{ fontSize: '0.98rem', color: '#666', marginBottom: 6 }}><span style={{ fontWeight: 500 }}>CEO:</span> {stock.ceo} &middot; <span style={{ fontWeight: 500 }}>Employees:</span> {stock.employees}</div>
              <div style={{ fontSize: '0.98rem', color: '#666', marginBottom: 6 }}><span style={{ fontWeight: 500 }}>Headquarters:</span> {stock.headquarters}</div>
              <div style={{ fontSize: '0.98rem', color: '#666', marginBottom: 6 }}><span style={{ fontWeight: 500 }}>Website:</span> <a href={stock.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontWeight: 500 }}>{stock.website}</a></div>
            </div>
            <div style={{ width: 1, background: 'var(--border-color)', minHeight: 160, alignSelf: 'stretch', margin: '28px 0 20px 0', display: 'block' }} />
            <div style={{ flex: 1, minWidth: 260, padding: '28px 28px 20px 28px' }}>
              <div style={{ fontWeight: 600, fontSize: '1.13rem', marginBottom: 8 }}>Latest News</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {news.map((n, i) => (
                  <li key={i} style={{ marginBottom: 16 }}>
                    <a href={n.url} style={{ color: '#1976d2', fontWeight: 500, fontSize: '1.01rem', textDecoration: 'none', transition: 'color 0.15s' }} onMouseOver={e => e.target.style.color = '#125ea2'} onMouseOut={e => e.target.style.color = '#1976d2'}>{n.title}</a>
                    <div style={{ color: '#888', fontSize: '0.93rem' }}>{n.date}</div>
                    <div style={{ color: '#444', fontSize: '0.97rem' }}>{n.summary}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Related Stocks */}
          <div style={{ marginTop: 44, background: 'var(--card-bg)', borderTop: '2px solid var(--border-color)', borderRadius: 12, padding: '22px 0 12px 0' }}>
            <div style={{ fontWeight: 600, fontSize: '1.08rem', marginBottom: 12, paddingLeft: 2, color: 'var(--text-muted)' }}>Related Stocks</div>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              {related.map((r, i) => (
                <div key={i} className="card" style={{ padding: '16px 22px', borderRadius: 18, minWidth: 160, cursor: 'pointer', background: 'var(--card-bg)', fontWeight: 500, color: 'var(--primary-color)', border: '1.5px solid var(--border-color)', boxShadow: '0 4px 24px 0 var(--shadow-color)' }} onClick={() => navigate(`/stock/${r.symbol}`)}>
                  <div style={{ fontSize: '1.08rem', marginBottom: 2 }}>{r.name}</div>
                  <div style={{ fontSize: '0.98rem', color: '#888' }}>{r.symbol}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Buy/Sell Widget */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 370, paddingLeft: 40 }}>
          <BuySellWidget stock={stock} />
        </div>
      </div>
    </div>
  );
} 