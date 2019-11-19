import React, { useState } from 'react';
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

function EnterNickname() {
  const [name, setName] = useState('');

  function handleInput(e) {
    setName(e.target.value);
  }

  return (
    <>
      <Input placeholder="닉네임" onChange={handleInput} />
      <Link
        to={{
          pathname: '/player',
          state: {
            nickname: name,
          },
        }}
      >
        <ButtonContainer>
          <GreenButton>닉네임 정하기</GreenButton>
        </ButtonContainer>
      </Link>
    </>
  );
}

export default EnterNickname;
