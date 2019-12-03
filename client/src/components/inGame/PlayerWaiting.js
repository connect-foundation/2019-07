import React from 'react';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import LoadingCircle from '../common/LoadingCircle';

const LoadingText = styled.span`
  font-size: 1.5rem;
  margin-top: 5rem;
  color: ${colors.PRIMARY_DEEP_GREEN};
  font-weight: bold;
  margin-top: auto;
  justify-self: flex-end;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 2rem;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex: 1;
  padding: 3rem;
  align-items: center;
`;

function PlayerWaiting() {
  return (
    <Main>
      <LoadingCircle color={colors.PRIMARY_DEEP_GREEN} />
      <LoadingText>게임 시작을 기다리고 있습니다...</LoadingText>
    </Main>
  );
}

export default PlayerWaiting;
