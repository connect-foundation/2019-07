import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext();

function ModalProvider({ children }) {
  const [isModalOn, setModalOn] = useState(false);

  function closeModal() {
    setModalOn(false);
  }

  function openModal() {
    setModalOn(true);
  }

  return (
    <ModalContext.Provider value={{ closeModal, openModal, isModalOn }}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
