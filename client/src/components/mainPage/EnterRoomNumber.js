import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';

const BUTTON_WIDTH = '20rem';
const BUTTON_HEIGHT = '5rem';
const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonWrapper = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
  button{
    width: ${BUTTON_WIDTH};
    height: ${BUTTON_HEIGHT};
  }
`;

const Input = styled.input`
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_HEIGHT};
  ${styles.InputStyle}
`;

function EnterRoomNumber() {
  return (
    <>
      <Input placeholder="방 번호" />
      <Link to="nickname">
        <ButtonWrapper>
          <GreenButton>입장하기</GreenButton>
        </ButtonWrapper>
      </Link>
      <Link to="host">
        <ButtonWrapper>
          <GreenButton>방 만들기</GreenButton>
        </ButtonWrapper>
      </Link>
    </>
  );
}

export default EnterRoomNumber;
