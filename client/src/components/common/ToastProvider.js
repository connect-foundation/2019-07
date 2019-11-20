import React, { createContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

export const ToastContext = createContext();

const ToastMessageBackground = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 6rem;
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  transform: translateY(100%);

  animation-name: ${props => props.animationName};
  animation-duration: 3s;
  animation-timing-function: linear;
`;

const ToastMessageContent = styled.span`
  position: absolute;
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.TEXT_WHITE};
  top: 50%;
  transform: translateY(-50%);
  margin: 0 1rem;
`;

function ToastProvider({ children }) {
  const [isToastOn, setToastOn] = useState(false);
  const [isTriggerOn, setTrigger] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isTriggerOn) {
      setTrigger(false);
    }
  }, [isTriggerOn]);

  function onToast(toastMessage) {
    setMessage(toastMessage);
    setTrigger(true);
    setToastOn(true);
  }

  function offToast() {
    setToastOn(false);
  }

  function ToastMessage() {
    const PopUp = keyframes`
    0% {
      transform: translateY(100%);
    }
    10% {
      transform: translateY(0%);
    }
    90%{
      transform: translateY(0%);
    }
    100%{
      transform: translateY(100%);
    }
  `;
    const animationName = isToastOn ? PopUp : 'none';

    return (
      <ToastMessageBackground
        animationName={animationName}
        onAnimationEndCapture={offToast}
      >
        <ToastMessageContent>{message}</ToastMessageContent>
      </ToastMessageBackground>
    );
  }

  return (
    <ToastContext.Provider
      value={{
        ToastMessage,
        onToast,
        offToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ToastProvider;
