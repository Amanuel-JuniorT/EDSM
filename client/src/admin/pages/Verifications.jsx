import { useState } from 'react';
import Modal from '../components/Modal';

// MOCK DATA: Replace with real API data in production
const mockVerifications = [
  {
    id: 1,
    user: 'John Doe',
    email: 'john@example.com',
    type: 'ID Card',
    submitted: '2024-03-10',
    status: 'pending',
    // Backend: Provide a URL or base64 for the document image or file
    documentUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    // Backend: Provide any additional fields needed for review
    notes: 'Front side of national ID card.'
  },
  {
    id: 2,
    user: 'Jane Smith',
    email: 'jane@example.com',
    type: 'Passport',
    submitted: '2024-03-12',
    status: 'pending',
    documentUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    notes: 'Passport page with photo and details.'
  },
  {
    id: 3,
    user: 'Bob Johnson',
    email: 'bob@example.com',
    type: 'Proof of Address',
    submitted: '2024-03-14',
    status: 'pending',
    documentUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    notes: 'Utility bill showing current address.'
  },
];

// --- BACKEND DEVELOPER: Provide a real API endpoint that returns verifications ---
// Expected response shape:
// [
//   {
//     id: number | string,
//     user: string,
//     email: string,
//     type: string,
//     submitted: string,
//     status: 'pending' | 'approved' | 'rejected',
//     documentUrl: string,
//     notes: string
//   },
//   ...
// ]
// --- END BACKEND DEVELOPER NOTE ---

export default function Verifications() {
  const [verifications, setVerifications] = useState(mockVerifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState(null);

  const filtered = verifications.filter(v => {
    const matchesSearch = v.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || v.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAction = (id, action) => {
    setVerifications(vs => vs.map(v => v.id === id ? { ...v, status: action } : v));
    setShowModal(false);
  };

  return (
    <section className="verifications-page">
      <header className="verifications-header">
        <h1>Verifications</h1>
        <div className="verifications-controls">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="ID Card">ID Card</option>
            <option value="Passport">Passport</option>
            <option value="Proof of Address">Proof of Address</option>
          </select>
        </div>
      </header>
      <section className="verifications-table-container">
        {filtered.length === 0 ? (
          <div className="empty-state">No verifications found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td>{v.user}</td>
                  <td>{v.type}</td>
                  <td>{v.submitted}</td>
                  <td>
                    <span className={`status-badge ${v.status}`}>{v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" onClick={() => { setSelectedVerification(v); setShowModal(true); }}>View</button>
                      {v.status === 'pending' && (
                        <>
                          <button className="approve-btn" onClick={() => handleAction(v.id, 'approved')}>Approve</button>
                          <button className="reject-btn" onClick={() => handleAction(v.id, 'rejected')}>Reject</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Verification Details"
        actions={null}
      >
        {selectedVerification && (
          <div className="verification-details">
            <div className="detail-group">
              <label>User:</label>
              <span>{selectedVerification.user} ({selectedVerification.email})</span>
            </div>
            <div className="detail-group">
              <label>Type:</label>
              <span>{selectedVerification.type}</span>
            </div>
            <div className="detail-group">
              <label>Submitted:</label>
              <span>{selectedVerification.submitted}</span>
            </div>
            <div className="detail-group">
              <label>Status:</label>
              <span className={`status-badge ${selectedVerification.status}`}>{selectedVerification.status.charAt(0).toUpperCase() + selectedVerification.status.slice(1)}</span>
            </div>
            <div className="detail-group">
              <label>Document:</label>
              <img src={selectedVerification.documentUrl} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="detail-group">
              <label>Notes:</label>
              <span>{selectedVerification.notes}</span>
            </div>
            {selectedVerification.status === 'pending' && (
              <div className="modal-actions">
                <button className="approve-btn" onClick={() => handleAction(selectedVerification.id, 'approved')}>Approve</button>
                <button className="reject-btn" onClick={() => handleAction(selectedVerification.id, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
} 