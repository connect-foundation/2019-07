import React from 'react';
import styled, { keyframes } from 'styled-components';

import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const LoadingAnimation = keyframes`
    from {
        transform: rotateZ(0deg);
    }
    to{
        transform: rotateZ(360deg);
    }
`;

const LoadingImage = styled.img.attrs({
  src: 'https://image.flaticon.com/icons/svg/189/189792.svg',
})`
  width: 30%;
  height: 30%;
  margin-top: auto;
  justify-self: center;
  animation: ${LoadingAnimation} 10s linear infinite;
`;

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
      <LoadingImage />
      <LoadingText>게임 시작을 기다리고 있습니다...</LoadingText>
    </Main>
  );
}

export default PlayerWaiting;
