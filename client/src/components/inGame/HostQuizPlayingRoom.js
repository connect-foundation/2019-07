import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import HostPlaying from './HostPlaying';
import HostSubResult from './HostSubResult';
import * as layout from './Layout';
import { Button } from '../common/Buttons';
import { HostGameContext } from '../../reducer/hostGameReducer';

const QuizInformation = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1rem;
`;

function HostQuizPlayingRoom() {
  const { dispatcher, roomState } = useContext(HostGameContext);
  const [showSubResult, setSubResultState] = useState(false);

  useEffect(() => {
    if (roomState.quizSubResult) {
      setSubResultState(true);
    }
  }, [roomState.quizSubResult]);

  useEffect(() => {
    setSubResultState(false);
  }, [roomState.currentQuiz]);

  return (
    <layout.Background>
      <layout.TitleContainer>
        <layout.Title>
          <QuizInformation>
            {roomState.currentQuiz.index + 1}/{roomState.totalQuizCount}
          </QuizInformation>
          {roomState.currentQuiz.title}
        </layout.Title>
      </layout.TitleContainer>
      <layout.Center>
        {!showSubResult && (
          <HostPlaying state={roomState} dispatcher={dispatcher} />
        )}
        {showSubResult && (
          <HostSubResult state={roomState} dispatcher={dispatcher} />
        )}
      </layout.Center>
      <layout.Bottom>
        <layout.ItemContainer>
          {roomState.currentQuiz.items.map((item, index) => (
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

export default HostQuizPlayingRoom;
