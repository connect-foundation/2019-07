import React, { useContext } from 'react';
import styled from 'styled-components';

import RangeInput from './RangeInput';
import { EditContext } from './EditContextProvider';

const TIME_PARAMS = [5, 10, 20, 30, 60, 90, 120];
const SCORE_PARAMS = [0, 1000, 2000];

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const OptionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

const OptionTitle = styled.span`
  font-weight: bold;
  font-size: 4vmin;
  user-select: none;
  margin-bottom: 2vmin;
`;

function OptionPanel() {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex } = quizsetState;
  const { timeLimit, score } = quizset[currentIndex];
  const timeLimitIndex = TIME_PARAMS.indexOf(timeLimit);
  const scoreIndex = SCORE_PARAMS.indexOf(score);

  function updateTimeLimit(value) {
    dispatch({ type: actionTypes.UPDATE_TIME_LIMIT, timeLimit: value });
  }

  function updateScore(value) {
    dispatch({ type: actionTypes.UPDATE_SCORE, score: value });
  }

  return (
    <Background>
      <OptionWrapper>
        <OptionTitle>시간</OptionTitle>
        <RangeInput
          params={TIME_PARAMS}
          onChange={updateTimeLimit}
          dependency={timeLimitIndex}
        />
      </OptionWrapper>
      <OptionWrapper>
        <OptionTitle>점수</OptionTitle>
        <RangeInput
          params={SCORE_PARAMS}
          onChange={updateScore}
          dependency={scoreIndex}
        />
      </OptionWrapper>
    </Background>
  );
}

export default OptionPanel;
