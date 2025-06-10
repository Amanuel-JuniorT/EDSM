import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/stocks', label: 'Stocks', icon: '📈' },
    { path: '/admin/transactions', label: 'Transactions', icon: '💱' },
    { path: '/admin/verifications', label: 'Verifications', icon: '✅' },
    { path: '/admin/news', label: 'News', icon: '📰' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar${isSidebarCollapsed ? ' collapsed' : ''}`}
        style={{ position: 'sticky', top: 0, height: '100vh' }}>
        <div className="sidebar-header">
          <h2>EDSM Admin</h2>
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item${location.pathname === item.path ? ' active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span className="icon">{item.icon}</span>
              {!isSidebarCollapsed && <span className="label">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header" style={{ position: 'sticky', top: 0, zIndex: 2 }}>
          <div className="header-left">
            <h1>{menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}</h1>
          </div>
          <div className="header-right">
            <button className="admin-profile">
              <span className="admin-avatar">👤</span>
              <span className="admin-name">Admin</span>
            </button>
          </div>
        </header>
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout; 