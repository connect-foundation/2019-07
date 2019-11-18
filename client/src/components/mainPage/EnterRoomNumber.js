import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';
import {
  MAIN_BUTTON_WIDTH,
  MAIN_BUTTON_HEIGHT,
  MAIN_BUTTON_MARGIN_TOP,
} from '../../constants/sizes';

const ButtonWrapper = styled.div`
  margin-top: ${MAIN_BUTTON_MARGIN_TOP};
  button{
    width: ${MAIN_BUTTON_WIDTH};
    height: ${MAIN_BUTTON_HEIGHT};
  }
`;

const Input = styled.input`
  width: ${MAIN_BUTTON_WIDTH};
  height: ${MAIN_BUTTON_HEIGHT};
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
