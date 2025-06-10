import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalStocks: 0,
    totalTransactions: 0,
    pendingVerifications: 0,
    systemStatus: 'Loading...'
  });

  // --- BACKEND DEVELOPER: Provide a real API endpoint that returns system status and stats ---
  // Expected response shape:
  // {
  //   totalUsers: number,
  //   activeUsers: number,
  //   totalStocks: number,
  //   totalTransactions: number,
  //   pendingVerifications: number,
  //   systemStatus: string (e.g. 'Operational', 'Degraded', 'Maintenance', 'Error')
  // }
  // --- END BACKEND DEVELOPER NOTE ---
  useEffect(() => {
    fetch('/api/admin/system-status') // <-- BACKEND: implement this endpoint
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats(stats => ({ ...stats, systemStatus: 'Unknown' })));
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="dashboard-header-card">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the EDSM Administration Panel</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
          <p className="stat-label">Active: {stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stocks</h3>
          <p className="stat-value">{stats.totalStocks}</p>
          <p className="stat-label">Listed Companies</p>
        </div>
        <div className="stat-card">
          <h3>Transactions</h3>
          <p className="stat-value">{stats.totalTransactions}</p>
          <p className="stat-label">Total Trades</p>
        </div>
        <div className="stat-card">
          <h3>Pending Verifications</h3>
          <p className="stat-value">{stats.pendingVerifications}</p>
          <p className="stat-label">Awaiting Review</p>
        </div>
      </div>

      <section className="quick-actions-row">
        <div className="quick-actions-title-col">
          <span className="quick-actions-title">Quick Actions</span>
        </div>
        <div className="quick-actions-buttons-grid">
          <button className="quick-action-btn-grid" onClick={() => window.location.href = '/admin/users'}>
            <span className="icon"><i className="fas fa-users"></i></span>
            <span>Manage Users</span>
          </button>
          <button className="quick-action-btn-grid" onClick={() => window.location.href = '/admin/stocks'}>
            <span className="icon"><i className="fas fa-chart-line"></i></span>
            <span>Manage Stocks</span>
          </button>
          <button className="quick-action-btn-grid" onClick={() => window.location.href = '/admin/transactions'}>
            <span className="icon"><i className="fas fa-exchange-alt"></i></span>
            <span>View Transactions</span>
          </button>
          <button className="quick-action-btn-grid" onClick={() => window.location.href = '/admin/verifications'}>
            <span className="icon"><i className="fas fa-check-square"></i></span>
            <span>Handle Verifications</span>
          </button>
        </div>
      </section>

      <section className="system-status">
        <h2>System Status</h2>
        <div className={`status-indicator ${stats.systemStatus.toLowerCase()}`}>
          {stats.systemStatus}
        </div>
      </section>
    </section>
  );
};

export default AdminDashboard; 