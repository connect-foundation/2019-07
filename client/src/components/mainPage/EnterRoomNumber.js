import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';

const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonContainer = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input`
  ${styles.InputStyle}
`;

function EnterRoomNumber() {
  return (
    <>
      <Input placeholder="방 번호" />
      <Link to="nickname">
        <ButtonContainer>
          <GreenButton>입장하기</GreenButton>
        </ButtonContainer>
      </Link>
      <Link to="host">
        <ButtonContainer>
          <GreenButton>방 만들기</GreenButton>
        </ButtonContainer>
      </Link>
    </>
  );
}

export default EnterRoomNumber;
