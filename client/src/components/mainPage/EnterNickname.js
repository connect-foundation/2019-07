import React, { useState } from 'react';
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
