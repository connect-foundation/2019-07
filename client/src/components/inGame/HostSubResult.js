import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GreenButton } from '../common/Buttons';
import ScoreChart from '../common/ScoreChart';
import DESKTOP_MIN_WIDTH from '../../constants/media';

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

const ScoreChartContainer = styled.div`
  width: 100%;
  height: 30%;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 50%;
    height: 38%;
  }
`;

function HostSubResult({ state, dispatcher }) {
  const itemDatas = state.quizSubResult.map((cur, index) => {
    if (state.currentQuiz.answer.includes(index)) {
      return { ...cur, isAnswer: true };
    }

    return { ...cur, isAnswer: false };
  });
  return (
    <>
      <ButtonContainer>
        <GreenButton
          onClick={() => {
            if (state.currentQuiz.index === state.totalQuizCount - 1) {
              dispatcher({ type: 'scoreBoard' });
              return;
            }
            dispatcher({ type: 'next' });
          }}
        >
          다음퀴즈
        </GreenButton>
      </ButtonContainer>
      <ScoreChartContainer>
        <ScoreChart itemDatas={itemDatas} />
      </ScoreChartContainer>
    </>
  );
}

HostSubResult.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.array.isRequired,
    currentQuiz: PropTypes.object.isRequired,
    totalQuizCount: PropTypes.number.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostSubResult;
