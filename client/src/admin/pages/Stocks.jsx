import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Table from '../components/Table';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    currentPrice: '',
    change: '',
    volume: '',
    marketCap: '',
    status: 'active'
  });
  const [addFormError, setAddFormError] = useState('');
  const [adding, setAdding] = useState(false);

  // --- BACKEND DEVELOPER: Provide a real API endpoint that returns stocks ---
  // Expected response shape:
  // [
  //   {
  //     id: number | string,
  //     symbol: string,
  //     name: string,
  //     currentPrice: number,
  //     change: string,
  //     volume: string,
  //     marketCap: string,
  //     status: 'active' | 'suspended',
  //     lastUpdated: string
  //   },
  //   ...
  // ]
  // --- END BACKEND DEVELOPER NOTE ---

  useEffect(() => {
    const mockStocks = [
      {
        id: 1,
        symbol: 'ETHAIR',
        name: 'Ethiopian Airlines',
        currentPrice: 2500.50,
        change: '+2.5%',
        volume: '1.2M',
        marketCap: '50B',
        status: 'active',
        lastUpdated: '2024-03-15 14:30'
      },
      {
        id: 2,
        symbol: 'ETHCOM',
        name: 'Ethio Telecom',
        currentPrice: 656.75,
        change: '-1.2%',
        volume: '850K',
        marketCap: '35B',
        status: 'active',
        lastUpdated: '2024-03-15 14:30'
      },
      {
        id: 3,
        symbol: 'ETHBNK',
        name: 'Commercial Bank of Ethiopia',
        currentPrice: 1200.25,
        change: '+0.8%',
        volume: '500K',
        marketCap: '25B',
        status: 'suspended',
        lastUpdated: '2024-03-15 14:30'
      }
    ];
    setStocks(mockStocks);
    setLoading(false);
  }, []);

  const handleEditStock = (e) => {
    e.preventDefault();
    setStocks(stocks.map(stock => 
      stock.id === selectedStock.id ? { ...selectedStock, lastUpdated: new Date().toLocaleString() } : stock
    ));
    setShowEditModal(false);
    setSelectedStock(null);
  };

  const handleDeleteStock = (stockId) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      setStocks(stocks.filter(stock => stock.id !== stockId));
    }
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    setAddFormError('');
    // Simple validation
    if (!newStock.symbol || !newStock.name || !newStock.currentPrice || !newStock.change || !newStock.volume || !newStock.marketCap) {
      setAddFormError('All fields are required.');
      return;
    }
    setAdding(true);
    try {
      // Optimistically add stock (mock, no backend)
      const created = {
        ...newStock,
        id: Date.now(),
        lastUpdated: new Date().toLocaleString(),
      };
      setStocks(stocks => [created, ...stocks]);
      setShowAddModal(false);
      setNewStock({ symbol: '', name: '', currentPrice: '', change: '', volume: '', marketCap: '', status: 'active' });
    } catch {
      setAddFormError('Failed to add stock. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Name', accessor: 'name' },
    { header: 'Current Price', accessor: 'currentPrice' },
    { header: 'Change', accessor: 'change' },
    { header: 'Volume', accessor: 'volume' },
    { header: 'Market Cap', accessor: 'marketCap' },
    { header: 'Status', accessor: 'status' },
    { header: 'Last Updated', accessor: 'lastUpdated' },
    { header: 'Actions', accessor: 'actions' },
  ];

  if (loading) {
    return <div className="loading">Loading stocks...</div>;
  }

  return (
    <section className="stocks-page">
      <header className="stocks-header">
        <h1>Stock Management</h1>
        <div className="stocks-controls">
          <button className="add-stock-btn" onClick={() => setShowAddModal(true)}>
            <span className="add-user-icon">+</span>
            Add Stock
          </button>
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>
      <section className="stocks-table-container">
        {filteredStocks.length === 0 ? (
          <div className="empty-state">No stocks found. Add a stock to get started!</div>
        ) : (
          <Table
            columns={columns}
            data={filteredStocks}
            renderRow={(stock) => (
              <tr key={stock.id}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>ETB {Number(stock.currentPrice).toLocaleString()}</td>
                <td className={stock.change.startsWith('+') ? 'positive' : 'negative'}>
                  {stock.change}
                </td>
                <td>{stock.volume}</td>
                <td>ETB {stock.marketCap}</td>
                <td>
                  <span className={`status-badge ${stock.status}`}>
                    {stock.status}
                  </span>
                </td>
                <td>{stock.lastUpdated}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setSelectedStock(stock);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteStock(stock.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </section>
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Stock"
        actions={null}
      >
        {selectedStock && (
          <form onSubmit={handleEditStock}>
            <div className="form-group">
              <label>Symbol</label>
              <input
                type="text"
                value={selectedStock.symbol}
                onChange={(e) => setSelectedStock({...selectedStock, symbol: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={selectedStock.name}
                onChange={(e) => setSelectedStock({...selectedStock, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Current Price</label>
              <input
                type="number"
                value={selectedStock.currentPrice}
                onChange={(e) => setSelectedStock({...selectedStock, currentPrice: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Change</label>
              <input
                type="text"
                value={selectedStock.change}
                onChange={(e) => setSelectedStock({...selectedStock, change: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Volume</label>
              <input
                type="text"
                value={selectedStock.volume}
                onChange={(e) => setSelectedStock({...selectedStock, volume: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Market Cap</label>
              <input
                type="text"
                value={selectedStock.marketCap}
                onChange={(e) => setSelectedStock({...selectedStock, marketCap: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={selectedStock.status}
                onChange={(e) => setSelectedStock({...selectedStock, status: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit" className="submit-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </form>
        )}
      </Modal>
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Stock"
        actions={null}
      >
        <form onSubmit={handleAddStock} className="add-stock-form">
          <div className="form-group">
            <label>Symbol</label>
            <input
              type="text"
              value={newStock.symbol}
              onChange={e => setNewStock({ ...newStock, symbol: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newStock.name}
              onChange={e => setNewStock({ ...newStock, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Current Price</label>
            <input
              type="number"
              value={newStock.currentPrice}
              onChange={e => setNewStock({ ...newStock, currentPrice: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Change</label>
            <input
              type="text"
              value={newStock.change}
              onChange={e => setNewStock({ ...newStock, change: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Volume</label>
            <input
              type="text"
              value={newStock.volume}
              onChange={e => setNewStock({ ...newStock, volume: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Market Cap</label>
            <input
              type="text"
              value={newStock.marketCap}
              onChange={e => setNewStock({ ...newStock, marketCap: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={newStock.status}
              onChange={e => setNewStock({ ...newStock, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          {addFormError && <div style={{ color: '#dc2626', marginBottom: '0.7rem', fontWeight: 500 }}>{addFormError}</div>}
          <div className="modal-actions">
            <button type="submit" className="submit-btn" disabled={adding}>
              {adding ? 'Adding...' : 'Add Stock'}
            </button>
            <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Stocks; 