import React from 'react';
import Router from './Router';
import ToastProvider from './components/common/ToastProvider';
import ModalProvider from './components/common/ModalProvider';

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
