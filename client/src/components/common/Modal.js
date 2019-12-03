import React, { useContext } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import { Button, YellowButton } from './Buttons';
import { ModalContext } from './ModalProvider';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const ModalOutside = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const ModalMain = styled.main`
  position: relative;
  top: 50%;
  left: 50%;
  width: 25rem;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 40rem;
  }
`;

const ModalTitle = styled.div`
  color: ${colors.TEXT_BLACK};
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid lightgray;
`;

const ModalButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;

  div.buttonWrapper {
    width: calc(50% - 1vw);
  }
  button {
    font-size: 1.5rem;

    @media (min-width: ${DESKTOP_MIN_WIDTH}) {
      font-size: 2rem;
    }
  }
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    margin-top: 2rem;
    justify-content: space-evenly;
  }
`;

const Description = styled.div`
  margin-bottom: 1rem;
  color: ${colors.TEXT_GRAY};
  word-break: keep-all;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 1.5rem;
  }
`;

function Modal({
  children,
  title,
  description,
  closeButton,
  actionButton,
  action,
}) {
  const { closeModal, isModalOn } = useContext(ModalContext);

  return (
    isModalOn && (
      <ModalOutside onClick={closeModal}>
        <ModalMain onClick={e => e.stopPropagation()}>
          <ModalTitle>{title}</ModalTitle>
          {description && <Description>{description}</Description>}
          {children}
          <ModalButtons>
            {closeButton && <Button onClick={closeModal}>{closeButton}</Button>}
            <YellowButton
              onClick={() => {
                if (action) action();
                closeModal();
              }}
            >
              {actionButton}
            </YellowButton>
          </ModalButtons>
        </ModalMain>
      </ModalOutside>
    )
  );
}

Modal.defaultProps = {
  actionButton: '확인',
};

export default Modal;
