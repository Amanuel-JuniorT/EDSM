import { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // --- BACKEND DEVELOPER: Provide a real API endpoint that returns transactions ---
  // Expected response shape:
  // [
  //   {
  //     id: number | string,
  //     userId: string,
  //     userName: string,
  //     type: 'buy' | 'sell',
  //     stockSymbol: string,
  //     quantity: number,
  //     price: number,
  //     total: number,
  //     status: 'completed' | 'pending' | 'failed',
  //     timestamp: string,
  //     paymentMethod: string,
  //     reference: string
  //   },
  //   ...
  // ]
  // --- END BACKEND DEVELOPER NOTE ---

  useEffect(() => {
    const mockTransactions = [
      {
        id: 1,
        userId: 'USER001',
        userName: 'John Doe',
        type: 'buy',
        stockSymbol: 'ETHAIR',
        quantity: 100,
        price: 2500.50,
        total: 250050.00,
        status: 'completed',
        timestamp: '2024-03-15 14:30:00',
        paymentMethod: 'bank',
        reference: 'TRX001'
      },
      {
        id: 2,
        userId: 'USER002',
        userName: 'Jane Smith',
        type: 'sell',
        stockSymbol: 'ETHCOM',
        quantity: 50,
        price: 656.75,
        total: 32837.50,
        status: 'pending',
        timestamp: '2024-03-15 14:35:00',
        paymentMethod: 'card',
        reference: 'TRX002'
      },
      {
        id: 3,
        userId: 'USER003',
        userName: 'Bob Johnson',
        type: 'buy',
        stockSymbol: 'ETHBNK',
        quantity: 200,
        price: 1200.25,
        total: 240050.00,
        status: 'failed',
        timestamp: '2024-03-15 14:40:00',
        paymentMethod: 'mobile',
        reference: 'TRX003'
      }
    ];
    setTransactions(mockTransactions);
    setLoading(false);
  }, []);

  const handleStatusChange = (transactionId, newStatus) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === transactionId ? { ...transaction, status: newStatus } : transaction
    ));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.stockSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const transactionDate = new Date(transaction.timestamp);
    const matchesDateRange = 
      (!dateRange.start || transactionDate >= new Date(dateRange.start)) &&
      (!dateRange.end || transactionDate <= new Date(dateRange.end));
    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  const columns = [
    { header: 'Reference', accessor: 'reference' },
    { header: 'User', accessor: 'userName' },
    { header: 'Type', accessor: 'type' },
    { header: 'Stock', accessor: 'stockSymbol' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Price', accessor: 'price' },
    { header: 'Total', accessor: 'total' },
    { header: 'Status', accessor: 'status' },
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Actions', accessor: 'actions' },
  ];

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  return (
    <section className="transactions-page">
      <header className="transactions-header">
        <h1>Transaction Monitoring</h1>
        <div className="transactions-controls">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <div className="date-range">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="date-input"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="date-input"
            />
          </div>
        </div>
      </header>
      <section className="transactions-table-container">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">No transactions found. Try adjusting your filters.</div>
        ) : (
          <Table
            columns={columns}
            data={filteredTransactions}
            renderRow={(transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.reference}</td>
                <td>{transaction.userName}</td>
                <td className={transaction.type === 'buy' ? 'buy' : 'sell'}>
                  {transaction.type.toUpperCase()}
                </td>
                <td>{transaction.stockSymbol}</td>
                <td>{transaction.quantity}</td>
                <td>ETB {Number(transaction.price).toLocaleString()}</td>
                <td>ETB {Number(transaction.total).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.timestamp}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowDetails(true);
                      }}
                    >
                      View
                    </button>
                    {transaction.status === 'pending' && (
                      <select
                        value={transaction.status}
                        onChange={(e) => handleStatusChange(transaction.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="completed">Complete</option>
                        <option value="failed">Fail</option>
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </section>
      {/* Transaction Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Transaction Details"
        actions={null}
      >
        {selectedTransaction && (
          <div className="transaction-details">
            <div className="detail-group">
              <label>Reference:</label>
              <span>{selectedTransaction.reference}</span>
            </div>
            <div className="detail-group">
              <label>User:</label>
              <span>{selectedTransaction.userName} ({selectedTransaction.userId})</span>
            </div>
            <div className="detail-group">
              <label>Type:</label>
              <span className={selectedTransaction.type === 'buy' ? 'buy' : 'sell'}>
                {selectedTransaction.type.toUpperCase()}
              </span>
            </div>
            <div className="detail-group">
              <label>Stock:</label>
              <span>{selectedTransaction.stockSymbol}</span>
            </div>
            <div className="detail-group">
              <label>Quantity:</label>
              <span>{selectedTransaction.quantity}</span>
            </div>
            <div className="detail-group">
              <label>Price:</label>
              <span>ETB {Number(selectedTransaction.price).toLocaleString()}</span>
            </div>
            <div className="detail-group">
              <label>Total:</label>
              <span>ETB {Number(selectedTransaction.total).toLocaleString()}</span>
            </div>
            <div className="detail-group">
              <label>Status:</label>
              <span className={`status-badge ${selectedTransaction.status}`}>
                {selectedTransaction.status}
              </span>
            </div>
            <div className="detail-group">
              <label>Timestamp:</label>
              <span>{selectedTransaction.timestamp}</span>
            </div>
            <div className="detail-group">
              <label>Payment Method:</label>
              <span>{selectedTransaction.paymentMethod}</span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Transactions; 