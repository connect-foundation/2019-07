import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GreenButton } from '../common/Buttons';
import * as colors from '../../constants/colors';

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

const QuizContainer = styled.div`
  position: relative;
  width: calc(100% - 2rem);
  max-height: 30%;
  min-height: 20rem;
`;

const RemainTime = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  font-weight: bold;
  color: ${colors.TEXT_WHITE};
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  font-size: 2rem;
  border-radius: 3rem;
`;

function HostPlaying({ state, dispatcher }) {
  const [remainTime, setRemainTime] = useState(0);

  useEffect(() => {
    setRemainTime(Number(state.currentQuiz.timeLimit));
    const timer = setInterval(() => {
      setRemainTime(cur => {
        if (cur === 0) {
          clearInterval(timer);
          dispatcher({ type: 'break' });
          return 0;
        }
        return cur - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [state.currentQuiz]);

  return (
    <>
      <ButtonContainer>
        <GreenButton
          onClick={() => {
            dispatcher({ type: 'break' });
          }}
        >
          다음퀴즈
        </GreenButton>
      </ButtonContainer>
      <QuizContainer>
        <RemainTime>{remainTime}</RemainTime>
      </QuizContainer>
    </>
  );
}

HostPlaying.propTypes = {
  state: PropTypes.shape({
    currentQuiz: PropTypes.object.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostPlaying;
