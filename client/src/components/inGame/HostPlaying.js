import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GreenButton } from '../common/Buttons';
import * as colors from '../../constants/colors';
import * as layout from './Layout';
import Hourglass from './Hourglass';

const RemainTime = styled.span`
  position: absolute;
  margin-top: auto;
  font-size: 2vw;
  font-weight: bold;
  user-select: none;
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
    <layout.CenterContentContainer>
      <layout.NextButtonWrapper>
        <GreenButton
          onClick={() => {
            dispatcher({ type: 'break' });
          }}
        >
          다음퀴즈
        </GreenButton>
      </layout.NextButtonWrapper>
      <layout.CenterLeftPanel>
        <Hourglass />
        <RemainTime>{remainTime}</RemainTime>
      </layout.CenterLeftPanel>
      <layout.ImagePanel></layout.ImagePanel>
      <layout.CenterRightPanel>
        <layout.RemainPeople>
          <br />
          100명이 풀이중
        </layout.RemainPeople>
      </layout.CenterRightPanel>
    </layout.CenterContentContainer>
  );
}

HostPlaying.propTypes = {
  state: PropTypes.shape({
    currentQuiz: PropTypes.object.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostPlaying;
