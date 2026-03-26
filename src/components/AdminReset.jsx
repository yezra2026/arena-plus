import React from 'react';

export function AdminReset() {
  const handleReset = () => {
  Object.keys(localStorage)
    .filter(k => k.startsWith('used_pins_'))
    .forEach(k => localStorage.removeItem(k));
  localStorage.setItem('pin_reset_trigger', Date.now());
};

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#1a1a1a', gap: 20
    }}>
      <h2 style={{ color: 'white', fontFamily: 'sans-serif' }}>Admin Reset</h2>
      <button onClick={handleReset} style={{
        padding: '14px 32px', background: '#FF6B00',
        color: 'white', border: 'none', borderRadius: 8,
        fontSize: 16, cursor: 'pointer', fontWeight: 700
      }}>
        Clear All Used PINs
      </button>
    </div>
  );
}