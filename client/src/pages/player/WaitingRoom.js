import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import Footer from '../../components/inGame/PlayerFooter';
import ProgressBar from '../../components/inGame/ProgressBar';

let socket;

function BeforeStart() {
  return (
    <>
      <LoadingImage />
      <LoadingText>게임 시작을 기다리고 있습니다...</LoadingText>
    </>
  );
}

function AfterStart() {
  return (
    <>
      <Saying>사람이 유머감각이 있는 게 아니다. <br />유머 감각이 사람을 움직이는 것이다.</Saying>
      <ProgressBar animationDurationSeconds={3} />
    </>
  );
}

function WatingRoom({ location }) {
  const [isQuizStart, setQuizStart] = useState(false);

  useState(() => {
    socket = io.connect('http://localhost:3001');
    socket.emit('enterPlayer', { nickname: location.state.nickname });
  }, []);

  socket.on('startQuiz', () => {
    setQuizStart(true);
  });

  return (
    <Container>
      <Main>
        {!isQuizStart ? BeforeStart() : AfterStart()}
      </Main>
      <Footer nickname={location.state.nickname} />
    </Container>
  );
}

WatingRoom.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};


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
  @media (min-width: 700px) {
    font-size: 2rem;
  }
`;

const Saying = styled.span`
  margin-top: auto;
  justify-self: center;
  font-size: 5vw;
  font-style: italic;
  text-align: center;
`;

export default WatingRoom;