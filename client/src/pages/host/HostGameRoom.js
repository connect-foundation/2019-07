import React, { useEffect, useReducer } from 'react';
import { Prompt } from 'react-router';
import styled from 'styled-components';
import io from 'socket.io-client';
import HostFooter from '../../components/inGame/HostFooter';
// import HostWaitingRoom from '../../components/inGame/HostWaitingRoom';
// import HostQuizLoading from '../../components/inGame/HostQuizLoading';
// import HostQuizPlaying from '../../components/inGame/HostQuizPlaying';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
const quizType = {
  Waiting: 'waiting',
  Loading: 'loading',
  Playing: 'playing',
};
const roomReducer = (state, action) => {
  switch (action.type) {
    case 'socket': {
      return { ...state, socket: action.socket };
    }
    case 'roomNumber': {
      return { ...state, roomNumber: action.roomNumber };
    }
    case 'players': {
      return { ...state, players: action.players };
    }
    case 'start': {
      state.socket.emit('startQuiz', { roomNumber: state.roomNumber });
      return { ...state, quizState: quizType.Loading };
    }
    case 'EndLoading': {
      return { ...state, quizState: quizType.Playing };
    }
    default:
      return state;
  }
};
function HostGameRoom() {
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);
  const initialRoomState = {
    roomNumber: '',
    players: [],
    socket,
    quizState: quizType.Waiting,
  };
  const [roomState, dispatcher] = useReducer(roomReducer, initialRoomState);
  useEffect(() => {
    socket.emit('openRoom');
    socket.on('openRoom', ({ roomNumber }) => {
      dispatcher({ type: 'roomNumber', roomNumber });
    });
    window.addEventListener('beforeunload', e => {
      e.returnValue = 'warning';
    });
    return () => {
      socket.emit('closeRoom');
    };
  }, []);
  socket.on('enterPlayer', players => {
    dispatcher({ type: 'players', players });
  });
  socket.on('leavePlayer', players => {
    dispatcher({ type: 'players', players });
  });
  return (
    <Container>
      <Prompt message="페이지를 이동하면 방이 닫힐 수 있습니다. 계속 하시겠습니까?" />
      {/* 이 컴포넌트 안에서 WaitingRoom, GameRoom 등을 갈아끼워야함 */}
      {roomState.quizState === quizType.Waiting && (
        <HostWaitingRoom dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.quizState === quizType.Loading && (
        <HostQuizLoading dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.quizState === quizType.Playing && (
        <HostQuizPlaying dispatcher={dispatcher} />
      )}
      <HostFooter roomNumber={roomState.roomNumber} />
    </Container>
  );
}
export default HostGameRoom;
