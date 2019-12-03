import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import HostPlaying from './HostPlaying';
import HostSubResult from './HostSubResult';
import * as layout from './Layout';
import { Button } from '../common/Buttons';

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
    <layout.Background>
      <layout.TitleContainer>
        <layout.Title>
          <QuizInformation>
            {state.currentQuiz.index + 1}/{state.totalQuizCount}
          </QuizInformation>
          {state.currentQuiz.title}
        </layout.Title>
      </layout.TitleContainer>
      <layout.Center>
        {!showSubResult && (
          <HostPlaying state={state} dispatcher={dispatcher} />
        )}
        {showSubResult && (
          <HostSubResult state={state} dispatcher={dispatcher} />
        )}
      </layout.Center>
      <layout.Bottom>
        <layout.ItemContainer>
          {state.currentQuiz.items.map((item, index) => (
            <layout.Item key={item.title}>
              <Button
                backgroundColor={colors.ITEM_COLOR[index]}
                fontColor={colors.TEXT_WHITE}
              >
                {item.title}
              </Button>
            </layout.Item>
          ))}
        </layout.ItemContainer>
      </layout.Bottom>
    </layout.Background>
  );
}

HostQuizPlayingRoom.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.array,
    currentQuiz: PropTypes.object.isRequired,
    totalQuizCount: PropTypes.number.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostQuizPlayingRoom;
