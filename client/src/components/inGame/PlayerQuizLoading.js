import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const Saying = styled.span`
  margin-top: auto;
  justify-self: center;
  font-size: 5vw;
  font-style: italic;
  text-align: center;
`;

function PlayerQuizLoading() {
  return (
    <>
      <Saying>
        사람이 유머감각이 있는 게 아니다. <br />
        유머 감각이 사람을 움직이는 것이다.
      </Saying>
      <ProgressBar animationDurationSeconds={3} />
    </>
  );
}

export default PlayerQuizLoading;
