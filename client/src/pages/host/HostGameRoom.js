import React, { useState, useEffect, useReducer } from 'react';
import { Prompt } from 'react-router';
import styled from 'styled-components';
import io from 'socket.io-client';
import HostFooter from '../../components/inGame/HostFooter';
import HostWaitingRoom from '../../components/inGame/HostWaitingRoom';
import HostLoading from '../../components/inGame/HostLoading';
import HostQuizPlayingRoom from '../../components/inGame/HostQuizPlayingRoom';
import GameResult from '../../components/inGame/HostResult';
import { roomReducer, initialRoomState } from '../../reducer/hostGameReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

function HostGameRoom() {
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);
  const [roomState, dispatcher] = useReducer(roomReducer, initialRoomState);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    dispatcher({ type: 'socket', socket });
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

  // 현재 방의 문제 세트 끝,
  socket.on('end', orderedRanking => {
    setRanking(orderedRanking);
  });

  return (
    <Container>
      <Prompt message="페이지를 이동하면 방이 닫힐 수 있습니다. 계속 하시겠습니까?" />
      {!roomState.isQuizStart && !roomState.currentQuiz && (
        <HostWaitingRoom dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.isQuizStart && !roomState.currentQuiz && (
        <HostLoading state={roomState} dispatcher={dispatcher} />
      )}
      {roomState.currentQuiz && !roomState.isQuizEnd && (
        <HostQuizPlayingRoom dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.isQuizEnd && <GameResult ranking={ranking} />}
      <HostFooter roomNumber={roomState.roomNumber} />
    </Container>
  );
}

export default HostGameRoom;
