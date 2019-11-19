import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';
import { fetchRoomNumber } from '../../utils/fetch';
import { ToastContext } from '../common/ToastStore';

const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonContainer = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input`
  ${styles.InputStyle}
`;

function EnterRoomNumber({ history }) {
  const [roomNumber, setRoomNumber] = useState('');
  const { onToast, offToast } = useContext(ToastContext);
  useEffect(offToast, []);

  function moveNicknamePage() {
    history.push({
      pathname: '/nickname',
      state: { roomNumber },
    });
  }

  function moveLoginPage() {
    history.push({
      pathname: '/login',
    });
  }

  function handleInputChange(e) {
    setRoomNumber(e.target.value);
  }

  async function handleEnterButtonClick() {
    const response = await fetchRoomNumber(roomNumber);

    if (response.isError) {
      onToast(response.message);
      return;
    }

    if (!response.isSuccess) {
      onToast(response.message);
      return;
    }

    moveNicknamePage();
  }

  function handleMakeButtonClick() {
    moveLoginPage();
  }

  function handlePressEnter(e) {
    if (e.key === 'Enter') {
      handleEnterButtonClick();
    }
  }

  return (
    <>
      <Input
        placeholder="방 번호"
        onChange={handleInputChange}
        onKeyUp={handlePressEnter}
      />
      <ButtonContainer>
        <GreenButton onClick={handleEnterButtonClick}>입장하기</GreenButton>
      </ButtonContainer>
      <ButtonContainer>
        <GreenButton onClick={handleMakeButtonClick}>방 만들기</GreenButton>
      </ButtonContainer>
    </>
  );
}

EnterRoomNumber.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default EnterRoomNumber;
