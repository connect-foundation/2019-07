import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';
import { fetchNickname } from '../../utils/fetch';
import { ToastContext } from '../common/ToastStore';

const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonContainer = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input`
  ${styles.InputStyle}
`;

function EnterNickname({ history }) {
  const { roomNumber } = history.location.state;
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

  function handlePressEnter(e) {
    if (e.key === 'Enter') {
      handleCreateButtonClick();
    }
  }

  return (
    <>
      <Input
        placeholder="닉네임"
        onChange={handleInputChange}
        onKeyUp={handlePressEnter}
      />
      <ButtonContainer>
        <GreenButton onClick={handleCreateButtonClick}>
          닉네임 정하기
        </GreenButton>
      </ButtonContainer>
    </>
  );
}

EnterNickname.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        roomNumber: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default EnterNickname;
