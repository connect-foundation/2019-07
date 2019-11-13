import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  BUTTON_WIDTH,
  BUTTON_HEIGHT,
  BUTTON_MARGIN_TOP,
} from '../../constants/components/main';
import * as styles from '../../styles/common';

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

      <Button>방 만들기</Button>
    </>
  );
}

export default Main;
