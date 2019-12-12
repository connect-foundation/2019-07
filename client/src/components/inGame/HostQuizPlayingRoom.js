import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import HostPlaying from './HostPlaying';
import HostSubResult from './HostSubResult';
import * as layout from './Layout';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import { HostGameContext } from '../../reducer/hostGameReducer';

const QuizInformation = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1rem;
  color: ${colors.TEXT_GRAY};
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 1.5rem;
  }
`;

const ItemList = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: ${props => props.fontColor};
  p {
    word-break: break-all;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    margin: 0;
    color: ${colors.TEXT_WHITE};
    font-size: 1.5vh;
    font-weight: bold;
    text-align: center;
  }
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
        {
          {
            false: <HostPlaying state={roomState} dispatcher={dispatcher} />,
            true: <HostSubResult state={roomState} dispatcher={dispatcher} />,
          }[showSubResult]
        }
      </layout.Center>
      <layout.Bottom>
        <layout.ItemContainer>
          {roomState.currentQuiz.items.map((item, index) => (
            <layout.Item key={item.title}>
              <ItemList key={item.title} fontColor={colors.ITEM_COLOR[index]}>
                <p>{item.title}</p>
              </ItemList>
            </layout.Item>
          ))}
        </layout.ItemContainer>
      </layout.Bottom>
    </layout.Background>
  );
}

export default HostQuizPlayingRoom;
