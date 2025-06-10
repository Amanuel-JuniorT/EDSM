import React from 'react';

export default function News() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#2563eb' }}>Coming Soon</h1>
      <p style={{ color: '#6b7280', fontSize: '1.25rem', marginTop: '1rem' }}>
        The admin news management page is under construction.
      </p>
    </div>
  );
}

// --- BACKEND DEVELOPER: Provide a real API endpoint that returns news ---
// Expected response shape:
// [
//   {
//     id: number | string,
//     title: string,
//     content: string,
//     date: string,
//     author: string,
//     status: 'published' | 'draft'
//   },
//   ...
// ]
// --- END BACKEND DEVELOPER NOTE --- 