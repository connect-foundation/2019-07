import React, { useEffect, useReducer } from 'react';
import { Prompt } from 'react-router';
import styled from 'styled-components';
import io from 'socket.io-client';
import HostFooter from '../../components/inGame/HostFooter';
import HostWaitingRoom from '../../components/inGame/HostWaitingRoom';
import HostLoading from '../../components/inGame/HostLoading';
import HostQuizPlayingRoom from '../../components/inGame/HostQuizPlayingRoom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const roomReducer = (state, action) => {
  switch (action.type) {
    case 'roomNumber': {
      return { ...state, roomNumber: action.roomNumber };
    }
    case 'players': {
      return { ...state, players: action.players };
    }
    case 'start': {
      state.socket.emit('start', { roomNumber: state.roomNumber });
      return { ...state, isQuizStart: true };
    }
    case 'setCurrentQuiz': {
      return {
        ...state,
        currentQuiz: {
          ...state.fullQuizData[action.index],
          index: action.index,
        },
      };
    }
    case 'next': {
      state.socket.emit('next', {
        roomNumber: state.roomNumber,
        nextQuizIndex: state.currentQuiz.index + 1,
      });

      return state;
    }
    case 'break': {
      state.socket.emit('break', {
        roomNumber: state.roomNumber,
        quizIndex: state.currentQuiz.index,
      });

      return state;
    }
    case 'setSubResult': {
      return { ...state, quizSubResult: action.subResult };
    }
    case 'setFullQuiz': {
      return {
        ...state,
        fullQuizData: action.data,
        totalQuizCount: action.data.length,
      };
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
    fullQuizData: [],
    totalQuizCount: 0,
    isQuizStart: false,
    currentQuiz: null,
    quizSubResult: null,
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

  socket.on('next', nextQuizIndex => {
    dispatcher({ type: 'setCurrentQuiz', index: nextQuizIndex });
  });

  socket.on('subResult', subResult => {
    dispatcher({ type: 'setSubResult', subResult });
  });

  return (
    <Container>
      <Prompt message="페이지를 이동하면 방이 닫힐 수 있습니다. 계속 하시겠습니까?" />
      {!roomState.isQuizStart && (
        <HostWaitingRoom dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.isQuizStart && !roomState.currentQuiz && (
        <HostLoading dispatcher={dispatcher} />
      )}
      {roomState.currentQuiz && (
        <HostQuizPlayingRoom dispatcher={dispatcher} state={roomState} />
      )}
      <HostFooter roomNumber={roomState.roomNumber} />
    </Container>
  );
}

export default HostGameRoom;
