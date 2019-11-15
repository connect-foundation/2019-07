import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as styles from '../../styles/common';

const BUTTON_WIDTH = '20rem';
const BUTTON_HEIGHT = '5rem';
const BUTTON_MARGIN_TOP = '1.5rem';

const Button = styled.button`
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_HEIGHT};
  ${styles.GreenButtonStyle}
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input`
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_HEIGHT};
  ${styles.InputStyle}
`;

function Main() {
  return (
    <>
      <Input placeholder="방 번호" />
      <Link to="nickname">
        <Button>입장하기</Button>
      </Link>
      <Link to="host">
        <Button>방 만들기</Button>
      </Link>
    </>
  );
}

export default Main;
