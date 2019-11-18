import React, { useState } from 'react';
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

function EnterNickname() {
  const [name, setName] = useState('');

  function handleInput(e) {
    setName(e.target.value);
  }

  return (
    <>
      <Input placeholder="닉네임" onChange={handleInput} />
      <Link to={{
        pathname: '/player',
        state: {
          nickname: name,
        },
      }}
      >
        <ButtonWrapper>
          <GreenButton>닉네임 정하기</GreenButton>
        </ButtonWrapper>
      </Link>
    </>
  );
}

export default EnterNickname;
