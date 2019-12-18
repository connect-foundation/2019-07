import React, { useState, useEffect, useReducer } from 'react';
import { Prompt, useLocation } from 'react-router';
import styled from 'styled-components';
import io from 'socket.io-client';

import HostFooter from '../../components/inGame/HostFooter';
import HostWaitingRoom from '../../components/inGame/HostWaitingRoom';
import HostLoading from '../../components/inGame/HostLoading';
import HostQuizPlayingRoom from '../../components/inGame/HostQuizPlayingRoom';
import GameResult from '../../components/inGame/HostResult';
import {
  roomReducer,
  initialRoomState,
  HostGameAction,
  HostGameContext,
} from '../../reducer/hostGameReducer';
import Loading from '../../components/common/Loading';
import Header from '../../components/common/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const LoadingWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const RoomNumber = styled.span`
  position: absolute;
  color: white;
  font-size: 10vmin;
  font-weight: bold;
  width: 100%;
  text-align: center;
  z-index: 10000;
  top: 50%;
  transform: translateY(-250%);

  &::before {
    content: '방 번호 ';
  }
`;

function HostGameRoom() {
  const location = useLocation();
  if (!location.state) {
    window.location.href = '/host/room/select';
  }

  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);
  const [roomState, dispatcher] = useReducer(roomReducer, initialRoomState);
  const [ranking, setRanking] = useState([]);
  const isEmptyRoom = roomState.players.length === 0;

  useEffect(() => {
    dispatcher({ type: HostGameAction.SET_SOCKET, socket });
    socket.emit('openRoom', { roomId: location.state.roomId });
    socket.on('openRoom', ({ roomNumber }) => {
      dispatcher({ type: HostGameAction.SET_ROOM_NUMBER, roomNumber });
    });

    function blockClose(e) {
      e.returnValue = 'warning';
    }

    function closeRoom() {
      socket.close();
    }

    window.addEventListener('beforeunload', blockClose);
    window.addEventListener('unload', closeRoom);

    return () => {
      closeRoom();
      window.removeEventListener('beforeunload', blockClose);
      window.removeEventListener('unload', closeRoom);
    };
  }, [location.state.roomId]);

  socket.on('enterPlayer', players => {
    dispatcher({ type: HostGameAction.SET_PLAYERS, players });
  });

  socket.on('leavePlayer', players => {
    dispatcher({ type: HostGameAction.SET_PLAYERS, players });
  });

  socket.on('next', nextQuizIndex => {
    dispatcher({ type: HostGameAction.SET_CURRENT_QUIZ, index: nextQuizIndex });
  });

  socket.on('subResult', subResult => {
    dispatcher({ type: HostGameAction.SET_SUB_RESULT, subResult });
  });

  socket.on('end', orderedRanking => {
    setRanking(orderedRanking);
    dispatcher({ type: HostGameAction.SHOW_SCOREBOARD });
  });

  return (
    <Container>
      {roomState.pageState !== 'END' && (
        <Prompt message="페이지를 이동하면 방이 닫힐 수 있습니다. 계속 하시겠습니까?" />
      )}
      {isEmptyRoom ? (
        <>
          <Header />
          <LoadingWrapper>
            <Loading message="참가자를 기다리고 있습니다..." />
            <RoomNumber>{roomState.roomNumber}</RoomNumber>
          </LoadingWrapper>
        </>
      ) : (
        <HostGameContext.Provider value={{ dispatcher, roomState }}>
          {
            {
              WAITING: <HostWaitingRoom />,
              LOADING: <HostLoading />,
              PLAYING: <HostQuizPlayingRoom />,
              END: <GameResult ranking={ranking} />,
            }[roomState.pageState]
          }
        </HostGameContext.Provider>
      )}

      <HostFooter roomNumber={roomState.roomNumber} />
    </Container>
  );
}

export default HostGameRoom;
