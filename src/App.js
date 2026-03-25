import React from 'react';
import { PinScreen } from './components/PinScreen';
import { AdminReset } from './components/AdminReset';

function App() {
  const isAdmin = window.location.search.includes('admin=true');
  return isAdmin ? <AdminReset /> : <PinScreen />;
}

export default App;
