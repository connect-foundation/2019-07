import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styled from 'styled-components';

import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';
import { fetchNickname, fetchRoomNumber } from '../../utils/fetch';
import { ToastContext } from '../common/ToastProvider';

const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonContainer = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input.attrs({
  maxLength: 20,
})`
  ${styles.InputStyle}
`;

function EnterNickname() {
  const history = useHistory();
  const match = useRouteMatch();
  const { roomNumber } = match.params;

  useEffect(() => {
    async function validateRoomNumber() {
      const { isSuccess } = await fetchRoomNumber(roomNumber);
      if (!isSuccess) {
        history.push('/');
        alert('존재하지 않는 방번호입니다');
      }
    }

    validateRoomNumber();
  }, [roomNumber]);

  const [nickname, setNickname] = useState('');
  const { onToast, offToast } = useContext(ToastContext);
  useEffect(offToast, []);

  function moveWaitingRoom() {
    history.push({
      pathname: '/player',
      state: { roomNumber, nickname },
    });
  }

  function handleInputChange(e) {
    setNickname(e.target.value);
  }

  async function handleCreateButtonClick() {
    const response = await fetchNickname(nickname, roomNumber);

    if (response.isError) {
      onToast(response.message);
      return;
    }

    if (!response.isSuccess) {
      onToast(response.message);
      return;
    }

    moveWaitingRoom();
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      handleCreateButtonClick();
      return;
    }

    if (/[^ㄱ-힣\w]+/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^ㄱ-힣\w]+/g, '');
      setNickname(e.target.value);
      onToast('닉네임에 특수문자는 입력할 수 없습니다');
    }
  }

  return (
    <>
      <Input
        placeholder="닉네임"
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <ButtonContainer>
        <GreenButton onClick={handleCreateButtonClick}>
          닉네임 정하기
        </GreenButton>
      </ButtonContainer>
    </>
  );
}

export default EnterNickname;
