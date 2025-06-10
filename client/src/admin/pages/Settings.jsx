import React, { useState } from 'react';

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'security', label: 'Security' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'account', label: 'Account' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2563eb' }}>Admin Settings</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #2563eb' : '3px solid transparent',
              color: activeTab === tab.key ? '#2563eb' : '#374151',
              fontWeight: activeTab === tab.key ? 600 : 500,
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ minHeight: 300 }}>
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Full Name</label>
        <input type="text" placeholder="Admin Name" style={inputStyle} disabled />
      </div>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Email</label>
        <input type="email" placeholder="admin@email.com" style={inputStyle} disabled />
      </div>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Profile Picture</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="https://ui-avatars.com/api/?name=Admin" alt="Profile" style={{ width: 56, height: 56, borderRadius: '50%' }} />
          <button type="button" style={buttonStyle} disabled>Change</button>
        </div>
      </div>
      <div>
        <button type="button" style={{ ...buttonStyle, background: '#2563eb', color: '#fff', cursor: 'not-allowed' }} disabled>Save Changes</button>
      </div>
    </form>
  );
}

function SecurityTab() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Current Password</label>
        <input type="password" placeholder="••••••••" style={inputStyle} disabled />
      </div>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>New Password</label>
        <input type="password" placeholder="New password" style={inputStyle} disabled />
      </div>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Two-Factor Authentication</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#059669', fontWeight: 500 }}>Disabled</span>
          <button type="button" style={buttonStyle} disabled>Enable</button>
        </div>
      </div>
      <div>
        <button type="button" style={{ ...buttonStyle, background: '#2563eb', color: '#fff', cursor: 'not-allowed' }} disabled>Update Security</button>
      </div>
    </form>
  );
}

function PreferencesTab() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Theme</label>
        <select style={inputStyle} disabled>
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Language</label>
        <select style={inputStyle} disabled>
          <option>English</option>
          <option>Amharic</option>
        </select>
      </div>
      <div>
        <label style={{ fontWeight: 500, color: '#374151' }}>Notifications</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" checked disabled /> Email
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" disabled /> SMS
          </label>
        </div>
      </div>
      <div>
        <button type="button" style={{ ...buttonStyle, background: '#2563eb', color: '#fff', cursor: 'not-allowed' }} disabled>Save Preferences</button>
      </div>
    </form>
  );
}

function AccountTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 400 }}>
      <button type="button" style={{ ...buttonStyle, background: '#f3f4f6', color: '#374151' }} disabled>Logout</button>
      <div style={{ border: '1px solid #fee2e2', background: '#fef2f2', borderRadius: 8, padding: '1rem' }}>
        <h3 style={{ color: '#dc2626', fontWeight: 600, marginBottom: 8 }}>Danger Zone</h3>
        <p style={{ color: '#b91c1c', marginBottom: 12 }}>Delete your admin account. This action cannot be undone.</p>
        <button type="button" style={{ ...buttonStyle, background: '#dc2626', color: '#fff', cursor: 'not-allowed' }} disabled>Delete Account</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  fontSize: '1rem',
  marginTop: 6,
  background: '#f9fafb',
};

const buttonStyle = {
  padding: '0.6rem 1.5rem',
  border: 'none',
  borderRadius: 8,
  background: '#e5e7eb',
  color: '#374151',
  fontWeight: 500,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

// --- BACKEND DEVELOPER: Provide a real API endpoint that returns settings ---
// Expected response shape:
// {
//   profile: {
//     name: string,
//     email: string,
//     avatar: string
//   },
//   security: {
//     twoFactorEnabled: boolean
//   },
//   preferences: {
//     theme: 'light' | 'dark' | 'system',
//     language: string,
//     notifications: {
//       email: boolean,
//       sms: boolean
//     }
//   }
// }
// --- END BACKEND DEVELOPER NOTE --- 