import { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    status: 'active',
    verified: false,
    joinDate: ''
  });
  const [adding, setAdding] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState(null);

  // --- BACKEND DEVELOPER: Provide a real API endpoint that returns users ---
  // Expected response shape:
  // [
  //   {
  //     id: number | string,
  //     name: string,
  //     email: string,
  //     status: 'active' | 'inactive' | 'pending',
  //     verified: boolean,
  //     joinDate: string (YYYY-MM-DD),
  //     ... (any other fields)
  //   },
  //   ...
  // ]
  useEffect(() => {
    fetch('/api/admin/users') // <-- BACKEND: implement this endpoint
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleVerification = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified: true } : user
    ));
  };

  const validateUser = (user) => {
    if (!user.name.trim()) return 'Name is required.';
    if (!user.email.trim()) return 'Email is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)) return 'Invalid email address.';
    if (!user.joinDate) return 'Join date is required.';
    return '';
  };

  // --- BACKEND DEVELOPER: Implement this endpoint ---
  // POST /api/admin/users
  // Accepts: JSON body with { name, email, status, verified, joinDate }
  // Returns: 201 Created (or 200 OK) and the created user object (with id)
  // On error: Return appropriate status (e.g., 400 for validation, 500 for server error) and a JSON error message
  // NOTE: The frontend expects a successful response (status 200/201) and the created user object in JSON.
  // If this endpoint is not implemented or returns an error, the UI will show "Failed to add user".
  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormError('');
    const error = validateUser(newUser);
    if (error) {
      setFormError(error);
      return;
    }
    setAdding(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Failed to add user');
      const created = await res.json();
      setUsers(users => [created, ...users]);
      setShowAddModal(false);
      setNewUser({ name: '', email: '', status: 'active', verified: false, joinDate: '' });
      setToast({ message: 'User added successfully!', type: 'success' });
    } catch {
      setFormError('Failed to add user. Please try again.');
      setToast({ message: 'Failed to add user.', type: 'error' });
    } finally {
      setAdding(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Status', accessor: 'status' },
    { header: 'Verified', accessor: 'verified' },
    { header: 'Join Date', accessor: 'joinDate' },
    { header: 'Actions', accessor: 'actions' },
  ];

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <section className="users-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <header className="users-header">
        <h1>User Management</h1>
        <div className="users-controls">
          <button className="add-stock-btn" onClick={() => setShowAddModal(true)}>
            <span className="add-user-icon">+</span>
            Add User
          </button>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </header>
      <section className="users-table-container">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">No users found. Add a user to get started!</div>
        ) : (
          <Table
            columns={columns}
            data={filteredUsers}
            renderRow={(user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <span className={`verification-badge ${user.verified ? 'verified' : 'unverified'}`}>
                    {user.verified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    {!user.verified && (
                      <button
                        onClick={() => handleVerification(user.id)}
                        className="verify-btn"
                      >
                        Verify
                      </button>
                    )}
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </section>
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        actions={null}
      >
        <form onSubmit={handleAddUser} className="add-user-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={newUser.status}
              onChange={e => setNewUser({ ...newUser, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="form-group">
            <label>Verified</label>
            <select
              value={newUser.verified ? 'yes' : 'no'}
              onChange={e => setNewUser({ ...newUser, verified: e.target.value === 'yes' })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              value={newUser.joinDate}
              onChange={e => setNewUser({ ...newUser, joinDate: e.target.value })}
              required
            />
          </div>
          {formError && <div style={{ color: '#dc2626', marginBottom: '0.7rem', fontWeight: 500 }}>{formError}</div>}
          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={adding}>
              {adding ? 'Adding...' : 'Add User'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Users; 