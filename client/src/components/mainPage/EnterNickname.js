import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styles from '../../styles/common';
import { GreenButton } from '../common/Buttons';

const BUTTON_MARGIN_TOP = '1.5rem';

const ButtonWrapper = styled.div`
  margin-top: ${BUTTON_MARGIN_TOP};
`;

const Input = styled.input`
  ${styles.InputStyle}
`;

function EnterNickname({ history }) {
  const { roomNumber } = history.location.state;
  const [nickname, setNickname] = useState('');

  function handleInputChange(e) {
    setNickname(e.target.value);
  }

  return (
    <>
      <Input placeholder="닉네임" onChange={handleInputChange} />
      <ButtonWrapper>
        <GreenButton>닉네임 정하기</GreenButton>
      </ButtonWrapper>
    </>
  );
}

EnterNickname.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({ roomNumber: PropTypes.string.isRequired }),
    }),
  }).isRequired,
};

export default EnterNickname;
