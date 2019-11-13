import React from 'react';
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

function Nickname() {
  return (
    <>
      <Input placeholder="닉네임" />
      <Button>닉네임 정하기</Button>
    </>
  );
}

export default Nickname;
