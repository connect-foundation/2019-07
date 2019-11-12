import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as colors from '../../constants/colors';
import Footer from '../../components/inGame/PlayerFooter';

function WatingRoom() {
  return (
    <Container>
      <Main>
        <LoadingImage />
        <LoadingText>게임 시작을 기다리고 있습니다...</LoadingText>
      </Main>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex: 1;
  padding: 3rem;
  align-items: center;
  justify-content: center;
`;

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
  animation: ${LoadingAnimation} 10s linear infinite;
`;

const LoadingText = styled.span`
  font-size: 1.5rem;
  margin-top: 5rem;
  color: ${colors.PRIMARY_DEEP_GREEN};
  font-weight: bold;
  @media (min-width: 700px) {
    font-size: 2rem;
  }
`;

export default WatingRoom;
