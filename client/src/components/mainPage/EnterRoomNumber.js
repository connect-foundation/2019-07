import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';
import { fetchRoomNumber } from '../../utils/fetch';
import { ToastContext } from '../common/ToastProvider';

const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonContainer = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input.attrs({
  type: 'number',
  pattern: 'd*',
})`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${styles.InputStyle}
`;

function EnterRoomNumber() {
  const history = useHistory();
  const [roomNumber, setRoomNumber] = useState('');
  const { onToast, offToast } = useContext(ToastContext);
  useEffect(offToast, []);

  function moveNicknamePage() {
    history.push(`/join/${roomNumber}`);
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
    if (e.ctrlKey || e.key === 'Backspace') return;
    if (e.key === 'Enter') {
      handleEnterButtonClick();
      return;
    }

    if (!/\d/.test(e.key)) {
      onToast('방번호는 숫자만 입력할 수 있습니다');
      return;
    }

    if (e.target.value.length >= 6) e.preventDefault();
  }

  return (
    <>
      <Input
        placeholder="방 번호"
        onChange={handleInputChange}
        onKeyDown={handlePressEnter}
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

export default EnterRoomNumber;
