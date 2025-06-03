import React, { useState, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { marketSearchInputRef } from '../Market/Market';
import { AppContext } from '../../context/AppContext';
Chart.register(ArcElement, Tooltip, Legend);

/*
  Dashboard.jsx - Main dashboard page for EDSM
  -------------------------------------------
  - Shows portfolio summary, quick actions, market feed, and news.
  - For backend/frontend devs: Add API integration, widgets, or summary logic here as needed.
*/

// Modern center text plugin
const centerTextPlugin = {
  id: 'centerText',
  afterDraw: (chart) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.font = 'bold 1.1rem Segoe UI, Arial';
    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ETB 40k', width / 2, height / 2);
    ctx.restore();
  }
};

// --- Mocked news data for dashboard news section ---
const newsData = [
  {
    title: "Stock Market Hits Record Highs",
    summary: "The Ethiopian stock market reached new heights today as...",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    date: "2024-06-01",
    category: "Market"
  },
  {
    title: "New IPO Announced",
    summary: "A new company is going public on EDSM. Find out how you can participate...",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    date: "2024-05-28",
    category: "Finance"
  },
  {
    title: "Technology Stocks Lead the Rally",
    summary: "Tech companies are driving the market rally, with ETHIT and ETHCOM up double digits...",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    date: "2024-05-25",
    category: "Technology"
  }
];

// --- Mocked market feed data for right-side market table ---
const marketFeed = [
  { name: 'ETHAIR', price: 2500.04, change: '+2%' },
  { name: 'ETHCOM', price: 656, change: '-23.1%' },
  { name: 'ETHAIR', price: 2500.04, change: '+2%' },
  { name: 'ETHCOM', price: 656, change: '-23.1%' },
];

// --- Donut chart data and options for portfolio overview ---
const donutData = {
  labels: ['ETHAIR', 'ETHCOM', 'ETHTEL', 'ETHBNK', 'ETHCES'],
  datasets: [
    {
      data: [40, 25, 15, 10, 10],
      backgroundColor: [
        'rgba(29,191,115,0.85)',
        'rgba(0,123,255,0.85)',
        'rgba(255,193,7,0.85)',
        'rgba(255,90,95,0.85)',
        'rgba(108,117,125,0.85)'
      ],
      borderWidth: 6,
      borderColor: '#fff',
      hoverOffset: 8,
    },
  ],
};

const donutOptions = {
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: '#fff',
      titleColor: '#222',
      bodyColor: '#222',
      borderColor: '#eee',
      borderWidth: 1,
      padding: 12,
      caretSize: 6,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showAddFund, setShowAddFund] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [fundMethod, setFundMethod] = useState('bank');
  const [fundSuccess, setFundSuccess] = useState(false);
  const [fundError, setFundError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankRef, setBankRef] = useState('');
  const { balance, setBalance } = useContext(AppContext);

  // --- Handles Add Fund form submission and validation ---
  const handleFundSubmit = (e) => {
    e.preventDefault();
    setFundError('');
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      setFundError('Please enter a valid amount.');
      return;
    }
    if (fundMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVC)) {
      setFundError('Please fill in all card details.');
      return;
    }
    if (fundMethod === 'mobile' && !mobileNumber) {
      setFundError('Please enter your mobile number.');
      return;
    }
    if (fundMethod === 'bank' && !bankRef) {
      setFundError('Please enter your bank reference number.');
      return;
    }
    setTimeout(() => {
      setFundSuccess(true);
      setBalance(prev => prev + Number(fundAmount));
    }, 600); // Simulate async
  };

  return (
    <div id="dashboard-page" className="page-content" style={{ display: 'block' }}>
      {/* Header with welcome and subtitle */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1>Welcome back, Nati <span className="wave">👋</span></h1>
          <div className="dashboard-subtitle">Here is your overview of your investments.</div>
        </div>
        <div className="dashboard-header-right"></div>
      </div>
      {/* Summary cards for portfolio value, gain/loss, balance */}
      <div className="dashboard-summary-cards">
        <div className="summary-card">
          <div className="summary-title">Portfolio Value</div>
          <div className="summary-value">ETB 40,340.32</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Daily Gain/Loss</div>
          <div className="summary-value positive"><i className="fas fa-arrow-up"></i> 2.23%</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Available Balance</div>
          <div className="summary-value">ETB {balance.toLocaleString()}</div>
        </div>
      </div>
      {/* Quick action buttons (buy, add fund, watchlist, search) */}
      <div className="dashboard-actions-row">
        <div className="card quick-action-card">
          <div className="card-header">
            <div className="card-title">Quick Action</div>
          </div>
          <div className="quick-actions">
            <button className="btn btn-outline" id="quick-buy-stock" onClick={() => navigate('/market', { state: { fromDashboard: true } })}><i className="fas fa-bolt"></i> Buy Stock</button>
            <button className="btn btn-add-fund" id="quick-add-fund" onClick={() => setShowAddFund(true)}><i className="fas fa-download"></i> Add Fund</button>
            <button className="btn btn-outline" id="quick-view-watchlist" onClick={() => navigate('/watchlist', { state: { fromDashboard: true } })}><i className="fas fa-bookmark"></i> View Watchlist</button>
            <button className="btn btn-outline" id="quick-search" onClick={() => {
              navigate('/market', { state: { fromDashboard: true } });
              setTimeout(() => {
                if (marketSearchInputRef && marketSearchInputRef.current) {
                  marketSearchInputRef.current.focus();
                }
              }, 300);
            }}><i className="fas fa-search"></i> Search</button>
          </div>
        </div>
      </div>
      {/* Main row: left = portfolio chart, right = market feed */}
      <div className="dashboard-main-row">
        <div className="dashboard-main-left">
          <div className="card portfolio-overview-card">
            <div className="card-header">
              <div className="card-title">Portfolio overview</div>
            </div>
            <div className="portfolio-overview-content">
              <div className="portfolio-chart-wrapper">
                <Doughnut
                  data={donutData}
                  options={donutOptions}
                  width={120}
                  height={120}
                  plugins={[centerTextPlugin]}
                />
              </div>
              <table className="portfolio-table">
                <thead>
                  <tr><th>Shares</th><th>Avg. price</th><th>Change</th></tr>
                </thead>
                <tbody>
                  <tr style={{ cursor: 'pointer' }} onClick={() => navigate('/stock/ETHAIR', { state: { fromDashboard: true } })}><td>ETHAIR</td><td>2,500.04</td><td className="positive">+2%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="dashboard-main-right">
          <div className="card market-feed-card">
            <div className="card-header">
              <div className="card-title">Market Feed</div>
            </div>
            <div style={{ padding: '0 0 0 0' }}>
              <div style={{ color: '#888', fontSize: '0.95rem', padding: '8px 16px 0 16px' }}>Top Gathers</div>
              <table className="market-feed-table">
                <thead>
                  <tr><th>name</th><th>price</th><th>Change</th></tr>
                </thead>
                <tbody>
                  {marketFeed.map((row, idx) => (
                    <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => navigate(`/stock/${row.name}`, { state: { fromDashboard: true } })}>
                      <td>{row.name}</td>
                      <td>{row.price}</td>
                      <td className={row.change.startsWith('+') ? 'positive' : 'negative'}>{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* News section (currently empty) */}
      <div className="dashboard-news-row">
        <div className="card news-card">
          <div className="card-header">
            <div className="card-title">News</div>
          </div>
          <div className="dashboard-news-list" id="dashboard-news-list">
            {/* No news in screenshot, so leave empty for now */}
          </div>
        </div>
      </div>
      {/* Add Fund Modal (shows when showAddFund is true) */}
      {showAddFund && (
        <div className="modal">
          <div className="modal-content advanced-modal" style={{ minWidth: 400, maxWidth: 420, padding: '0', overflow: 'visible', position: 'relative', background: 'var(--card-bg)', border: '1.5px solid var(--border-color)', boxShadow: '0 4px 24px 0 var(--shadow-color)' }}>
            {/* Close Button */}
            <button className="modal-close" style={{ position: 'absolute', top: 18, right: 18, fontSize: 28, background: 'none', border: 'none', color: '#888', cursor: 'pointer', zIndex: 2 }} onClick={() => { setShowAddFund(false); setFundSuccess(false); setFundAmount(''); setFundError(''); setCardNumber(''); setCardExpiry(''); setCardCVC(''); setMobileNumber(''); setBankRef(''); }}>&times;</button>
            {/* Header */}
            <div style={{ padding: '36px 36px 0 36px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: 6, letterSpacing: 0.01 }}>Add Fund</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(25, 167, 242, 0.07)', borderRadius: 10, padding: '10px 0', marginBottom: 18 }}>
                <i className="fas fa-wallet" style={{ color: '#1976d2', fontSize: 22, marginRight: 10 }}></i>
                <span style={{ color: '#1976d2', fontWeight: 700, fontSize: '1.13rem' }}>Current Balance:</span>
                <span style={{ color: '#1976d2', fontWeight: 800, fontSize: '1.13rem', marginLeft: 8 }}>ETB {balance.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ padding: '0 36px 32px 36px' }}>
              {fundSuccess ? (
                <div className="modal-success" style={{ margin: '2.5rem 0 1.5rem 0', textAlign: 'center' }}><i className="fas fa-check-circle"></i> Fund added successfully!</div>
              ) : (
                <form onSubmit={handleFundSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  {/* Amount Input */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="fund-amount" style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>Amount</label>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#1976d2', fontWeight: 700, fontSize: '1.13em', pointerEvents: 'none', letterSpacing: 0.5 }}>ETB</span>
                      <input
                        id="fund-amount"
                        type="number"
                        min="1"
                        className="modal-input"
                        style={{ paddingLeft: 60, fontWeight: 700, fontSize: '1.18em', height: 48, border: fundError && !fundAmount ? '1.5px solid #e53935' : undefined, background: '#f7fafd' }}
                        value={fundAmount}
                        onChange={e => setFundAmount(e.target.value)}
                        placeholder="Enter amount (e.g. 1,000)"
                        required
                      />
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>Payment Method</label>
                    <div className="modal-methods" style={{ gap: 12 }}>
                      <button type="button" className={`modal-method-btn${fundMethod === 'bank' ? ' active' : ''}`} style={{ minWidth: 110 }} onClick={() => setFundMethod('bank')}><i className="fas fa-university"></i> Bank</button>
                      <button type="button" className={`modal-method-btn${fundMethod === 'card' ? ' active' : ''}`} style={{ minWidth: 90 }} onClick={() => setFundMethod('card')}><i className="fas fa-credit-card"></i> Card</button>
                      <button type="button" className={`modal-method-btn${fundMethod === 'mobile' ? ' active' : ''}`} style={{ minWidth: 120 }} onClick={() => setFundMethod('mobile')}><i className="fas fa-mobile-alt"></i> Mobile Money</button>
                    </div>
                  </div>
                  {/* Dynamic Fields */}
                  {fundMethod === 'bank' && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="bank-ref" style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>Bank Reference Number</label>
                      <input
                        id="bank-ref"
                        className="modal-input"
                        value={bankRef}
                        onChange={e => setBankRef(e.target.value)}
                        placeholder="e.g. 1234567890"
                        required
                        style={{ fontWeight: 600, background: '#f7fafd' }}
                      />
                    </div>
                  )}
                  {fundMethod === 'card' && (
                    <>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="card-number" style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>Card Number</label>
                        <input
                          id="card-number"
                          className="modal-input"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          style={{ fontWeight: 600, background: '#f7fafd' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                          <label htmlFor="card-expiry" style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>Expiry</label>
                          <input
                            id="card-expiry"
                            className="modal-input"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            style={{ fontWeight: 600, background: '#f7fafd' }}
                          />
                        </div>
                        <div className="form-group" style={{ width: 90, minWidth: 60, maxWidth: 100, marginBottom: 0 }}>
                          <label htmlFor="card-cvc" style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>CVC</label>
                          <input
                            id="card-cvc"
                            className="modal-input"
                            value={cardCVC}
                            onChange={e => setCardCVC(e.target.value)}
                            placeholder="CVC"
                            maxLength={4}
                            required
                            style={{ fontWeight: 600, background: '#f7fafd', textAlign: 'center', width: '100%' }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {fundMethod === 'mobile' && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="mobile-number" style={{ fontWeight: 700, marginBottom: 6, display: 'block' }}>Mobile Number</label>
                      <input
                        id="mobile-number"
                        className="modal-input"
                        value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value)}
                        placeholder="e.g. 0912 345 678"
                        maxLength={13}
                        required
                        style={{ fontWeight: 600, background: '#f7fafd' }}
                      />
                    </div>
                  )}
                  {/* Error Message */}
                  {fundError && <div className="modal-error" style={{ marginBottom: 2, marginTop: 2, color: '#e53935', fontWeight: 600 }}>{fundError}</div>}
                  {/* Sticky Add Fund Button */}
                  <div style={{ position: 'sticky', bottom: 0, background: 'white', paddingTop: 18, paddingBottom: 0, zIndex: 1, margin: 0 }}>
                    <button className="btn btn-add-fund-main modal-btn" type="submit" disabled={!fundAmount} style={{ width: '100%', fontWeight: 800, fontSize: '1.15em', padding: '15px 0', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,123,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
                      <i className="fas fa-plus-circle" style={{ marginRight: 8 }}></i> Add Fund
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
