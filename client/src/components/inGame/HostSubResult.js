import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GreenButton } from '../common/Buttons';

const ButtonContainer = styled.div`
  display: flex;
  margin: 1rem;
  justify-content: flex-end;
  width: calc(100% - 2rem);
  button {
    font-size: 1.5rem;
    width: 8rem;
  }
`;

function HostSubResult({ state, dispatcher }) {
  return (
    <>
      <ButtonContainer>
        <GreenButton
          onClick={() => {
            dispatcher({ type: 'next' });
          }}
        >
          다음퀴즈
        </GreenButton>
      </ButtonContainer>
      <li>{state.quizSubResult.items[0].playerCount}</li>
      <li>{state.quizSubResult.items[1].playerCount}</li>
      <li>{state.quizSubResult.items[2].playerCount}</li>
      <li>{state.quizSubResult.items[3].playerCount}</li>
    </>
  );
}

HostSubResult.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.object.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostSubResult;
