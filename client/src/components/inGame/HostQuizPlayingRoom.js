import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import HostPlaying from './HostPlaying';
import HostSubResult from './HostSubResult';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  padding: 2rem 0;
  color: ${colors.TEXT_BLACK};
  box-shadow: 0 5px 5px -4px ${colors.TEXT_GRAY};
`;

const ItemContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 45%;
  flex-flow: wrap;
  justify-content: space-evenly;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 2rem);
    height: calc(50% - 1rem);
    color: ${colors.TEXT_WHITE};
    font-size: 2rem;
    font-weight: bold;
  }
`;

const QuizInformation = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1rem;
`;

function HostQuizPlayingRoom({ state, dispatcher }) {
  const [showSubResult, setSubResultState] = useState(false);

  useEffect(() => {
    if (state.quizSubResult) {
      setSubResultState(true);
    }
  }, [state.quizSubResult]);

  useEffect(() => {
    setSubResultState(false);
  }, [state.currentQuiz]);

  return (
    <Container>
      <Title>
        <QuizInformation>
          {state.currentQuiz.index + 1}/{state.totalQuizCount}
        </QuizInformation>
        {state.currentQuiz.title}
      </Title>
      {!showSubResult && <HostPlaying state={state} dispatcher={dispatcher} />}
      {showSubResult && <HostSubResult state={state} dispatcher={dispatcher} />}
      <ItemContainer>
        <li style={{ backgroundColor: colors.ITEM_COLOR[0] }}>
          {state.currentQuiz.items[0].title}
        </li>
        <li style={{ backgroundColor: colors.ITEM_COLOR[1] }}>
          {state.currentQuiz.items[1].title}
        </li>
        <li style={{ backgroundColor: colors.ITEM_COLOR[2] }}>
          {state.currentQuiz.items[2].title}
        </li>
        <li style={{ backgroundColor: colors.ITEM_COLOR[3] }}>
          {state.currentQuiz.items[3].title}
        </li>
      </ItemContainer>
    </Container>
  );
}

HostQuizPlayingRoom.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.object.isRequired,
    currentQuiz: PropTypes.object.isRequired,
    totalQuizCount: PropTypes.string.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostQuizPlayingRoom;
