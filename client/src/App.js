import React from 'react';
import Router from './Router';
import ToastProvider from './components/common/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  );
}

export default App;
