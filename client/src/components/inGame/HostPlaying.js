import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GreenButton } from '../common/Buttons';
import * as layout from './Layout';
import Hourglass from './Hourglass';
import { HostGameAction, HostGameContext } from '../../reducer/hostGameReducer';
import multipleChoiceImage from '../../assets/images/multiple_choice.svg';

const RemainTime = styled.span`
  position: absolute;
  margin-top: auto;
  font-size: 2vw;
  font-weight: bold;
  user-select: none;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

function HostPlaying() {
  const [remainTime, setRemainTime] = useState(0);
  const { dispatcher, roomState } = useContext(HostGameContext);

  useEffect(() => {
    setRemainTime(Number(roomState.currentQuiz.timeLimit));
    const timer = setInterval(() => {
      setRemainTime(cur => {
        if (cur === 0) {
          clearInterval(timer);
          dispatcher({ type: HostGameAction.REQUEST_SUB_RESULT });
          return 0;
        }
        return cur - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [roomState.currentQuiz]);

  return (
    <layout.CenterContentContainer>
      <layout.NextButtonWrapper>
        <GreenButton
          onClick={() => {
            dispatcher({ type: HostGameAction.REQUEST_SUB_RESULT });
          }}
        >
          정답확인
        </GreenButton>
      </layout.NextButtonWrapper>
      <layout.CenterLeftPanel>
        <Hourglass />
        <RemainTime>{remainTime}</RemainTime>
      </layout.CenterLeftPanel>
      <layout.ImagePanel>
        <ImageContainer
          image={roomState.currentQuiz.image || multipleChoiceImage}
        />
      </layout.ImagePanel>
      <layout.CenterRightPanel>
        <layout.RemainPeople>
          <br />
          {roomState.players.length}명이 참가 중
        </layout.RemainPeople>
      </layout.CenterRightPanel>
    </layout.CenterContentContainer>
  );
}

export default HostPlaying;
