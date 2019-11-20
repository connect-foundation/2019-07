import React from 'react';
import Router from './Router';
import ToastStore from './components/common/ToastStore';

function App() {
  return (
    <ToastStore>
      <Router />
    </ToastStore>
  );
}

export default App;
