import React, { useState } from 'react';
import { FaUser, FaLock, FaCogs, FaUserShield, FaSave, FaCamera, FaMoon, FaSun, FaBell, FaTrash } from 'react-icons/fa';

const TABS = [
  { key: 'profile', label: 'Profile', icon: <FaUser /> },
  { key: 'security', label: 'Security', icon: <FaLock /> },
  { key: 'preferences', label: 'Preferences', icon: <FaCogs /> },
  { key: 'account', label: 'Account', icon: <FaUserShield /> },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: 12 }}>
        <FaCogs style={{ fontSize: 28 }} /> Admin Settings
      </h1>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', borderBottom: '1px solid #e5e7eb' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            title={tab.label}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #2563eb' : '3px solid transparent',
              color: activeTab === tab.key ? '#2563eb' : '#374151',
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: '1.08rem',
              padding: '0.85rem 1.7rem 0.7rem 1.7rem',
              cursor: 'pointer',
              transition: 'color 0.2s, border-bottom 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {tab.icon} <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div style={{ minHeight: 340 }}>
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
}

function ProfileTab() {
  const [name, setName] = useState('Admin Name');
  const [email, setEmail] = useState('admin@email.com');
  const [avatar, setAvatar] = useState('https://ui-avatars.com/api/?name=Admin');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // TODO: BACKEND DEV - Load real admin profile data here

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Invalid email.');
    setSaving(true);
    // TODO: BACKEND DEV - Save profile changes to backend
    setTimeout(() => {
      setSaving(false);
      // Show toast or feedback on success/failure
    }, 1000);
  };

  const handleAvatarChange = (e) => {
    // TODO: BACKEND DEV - Upload and update profile picture
    // For now, just preview
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <div>
        <label style={labelStyle}>Full Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} autoComplete="name" />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} autoComplete="email" />
      </div>
      <div>
        <label style={labelStyle}>Profile Picture</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={avatar} alt="Profile" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #e5e7eb' }} />
          <label htmlFor="avatar-upload" style={{ ...buttonStyle, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <FaCamera /> Change
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
      {error && <div style={{ color: '#dc2626', fontWeight: 500 }}>{error}</div>}
      <div>
        <button type="submit" style={{ ...buttonStyle, background: '#2563eb', color: '#fff' }} disabled={saving}>
          <FaSave style={{ marginRight: 6 }} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

function SecurityTab() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // TODO: BACKEND DEV - Implement password change logic

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    if (!current || !next) return setError('All fields required.');
    if (next.length < 6) return setError('Password too short.');
    setSaving(true);
    // TODO: BACKEND DEV - Save new password
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <div>
        <label style={labelStyle}>Current Password</label>
        <input type={show ? 'text' : 'password'} value={current} onChange={e => setCurrent(e.target.value)} style={inputStyle} autoComplete="current-password" />
      </div>
      <div>
        <label style={labelStyle}>New Password</label>
        <input type={show ? 'text' : 'password'} value={next} onChange={e => setNext(e.target.value)} style={inputStyle} autoComplete="new-password" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={show} onChange={e => setShow(e.target.checked)} id="showpass" />
        <label htmlFor="showpass" style={{ fontSize: 14, color: '#374151', cursor: 'pointer' }}>Show Passwords</label>
      </div>
      {error && <div style={{ color: '#dc2626', fontWeight: 500 }}>{error}</div>}
      <div>
        <button type="submit" style={{ ...buttonStyle, background: '#2563eb', color: '#fff' }} disabled={saving}>
          <FaSave style={{ marginRight: 6 }} /> {saving ? 'Saving...' : 'Update Security'}
        </button>
      </div>
    </form>
  );
}

function PreferencesTab() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('English');
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [saving, setSaving] = useState(false);

  // TODO: BACKEND DEV - Load and save preferences

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    // TODO: BACKEND DEV - Save preferences to backend
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <div>
        <label style={labelStyle}>Theme</label>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" style={{ ...buttonStyle, background: theme === 'light' ? '#2563eb' : '#e5e7eb', color: theme === 'light' ? '#fff' : '#374151' }} onClick={() => setTheme('light')}><FaSun /> Light</button>
          <button type="button" style={{ ...buttonStyle, background: theme === 'dark' ? '#2563eb' : '#e5e7eb', color: theme === 'dark' ? '#fff' : '#374151' }} onClick={() => setTheme('dark')}><FaMoon /> Dark</button>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Language</label>
        <select style={inputStyle} value={lang} onChange={e => setLang(e.target.value)}>
          <option>English</option>
          <option>Amharic</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Notifications</label>
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} /> <FaBell /> Email
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" checked={smsNotif} onChange={e => setSmsNotif(e.target.checked)} /> SMS
          </label>
        </div>
      </div>
      <div>
        <button type="submit" style={{ ...buttonStyle, background: '#2563eb', color: '#fff' }} disabled={saving}>
          <FaSave style={{ marginRight: 6 }} /> {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
}

function AccountTab() {
  // TODO: BACKEND DEV - Implement logout and account deletion
  const [deleting, setDeleting] = useState(false);
  const handleDelete = () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    setDeleting(true);
    // TODO: BACKEND DEV - Call API to delete account
    setTimeout(() => setDeleting(false), 1200);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 400 }}>
      <button type="button" style={{ ...buttonStyle, background: '#f3f4f6', color: '#374151' }} disabled>Logout {/* TODO: BACKEND DEV - Implement logout */}</button>
      <div style={{ border: '1px solid #fee2e2', background: '#fef2f2', borderRadius: 8, padding: '1rem' }}>
        <h3 style={{ color: '#dc2626', fontWeight: 600, marginBottom: 8 }}>Danger Zone</h3>
        <p style={{ color: '#b91c1c', marginBottom: 12 }}>Delete your admin account. This action cannot be undone.</p>
        <button type="button" style={{ ...buttonStyle, background: '#dc2626', color: '#fff' }} onClick={handleDelete} disabled={deleting}>
          <FaTrash style={{ marginRight: 6 }} /> {deleting ? 'Deleting...' : 'Delete Account'}
        </button>
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
const labelStyle = { fontWeight: 500, color: '#374151', marginBottom: 4 };
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

// --- BACKEND DEVELOPER: Provide a real API endpoint that returns admin settings ---
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