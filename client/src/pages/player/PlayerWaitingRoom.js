import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import PlayerFooter from '../../components/inGame/PlayerFooter';
import ProgressBar from '../../components/inGame/ProgressBar';
import DESKTOP_MIN_WIDTH from '../../constants/media';

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
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
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
      <Saying>
        사람이 유머감각이 있는 게 아니다. <br />
        유머 감각이 사람을 움직이는 것이다.
      </Saying>
      <ProgressBar animationDurationSeconds={3} />
    </>
  );
}

function PlayerWaitingRoom({ location, history }) {
  const [isQuizStart, setQuizStart] = useState(false);
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  useEffect(() => {
    socket.emit('enterPlayer', {
      nickname: location.state.nickname,
      roomNumber: location.state.roomNumber,
    });

    return () => {
      /**
       * react-router의 Prompt를 사용하면 페이지를 나가는 것을 막을 수 있지만
       * 아래 closeRoom 수신 시 history.push가 정상동작하지 않는 문제가 있음.
       */
      socket.emit('leavePlayer', {
        nickname: location.state.nickname,
        roomNumber: location.state.roomNumber,
      });
    };
  }, []);

  socket.on('startQuiz', () => {
    setQuizStart(true);
  });

  socket.on('closeRoom', () => {
    /**
     * 사용자에게 Modal로 방이 닫혔음을 알림
     * 사용자가 어떤 형태로든 창을 닫으면 경로를 바꾼다.
     */
    history.push({
      pathname: '/',
    });
  });

  return (
    <Container>
      <Main>{!isQuizStart ? BeforeStart() : AfterStart()}</Main>
      <PlayerFooter nickname={location.state.nickname} />
    </Container>
  );
}

PlayerWaitingRoom.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlayerWaitingRoom;
