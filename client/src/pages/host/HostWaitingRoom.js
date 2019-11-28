import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import HostFooter from '../../components/inGame/HostFooter';
import { YellowButton } from '../../components/common/Buttons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 4rem;
  width: 7rem;
`;

const RoomInformation = styled.div`
  @media (min-width: 700px) {
    width: auto;
    font-size: 3rem;
  }
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  width: 10rem;
  color: ${colors.TEXT_WHITE};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  padding: 3rem;
  overflow: hidden;
`;

const PlayerCounter = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.TEXT_BLACK};
`;

const PlayerList = styled.ul`
  background-color: white;
  flex: 1;
  overflow-y: auto;
  li {
    display: inline-block;
    margin: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.TEXT_BLACK};
  }
`;

function HostWaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  useEffect(() => {
    socket.emit('openRoom');
    socket.on('openRoom', roomCode => {
      setRoomNumber(roomCode.roomNumber);
    });

    return () => {
      socket.emit('closeRoom');
    };
  }, []);

  socket.on('enterPlayer', playerList => {
    setPlayers(playerList);
  });

  socket.on('leavePlayer', playerList => {
    setPlayers(playerList);
  });

  function startQuiz() {
    socket.emit('start', { roomNumber });
  }

  return (
    <Container>
      <Header>
        <RoomInformation>
          방 번호 <strong>{roomNumber}</strong>
        </RoomInformation>
        <ButtonContainer>
          <YellowButton onClick={startQuiz}>Start</YellowButton>
        </ButtonContainer>
      </Header>
      <Main>
        <PlayerCounter>대기자 {players.length}명</PlayerCounter>
        <PlayerList>
          {players.map(player => (
            <li key={player.nickname}>{player.nickname}</li>
          ))}
        </PlayerList>
      </Main>
      <HostFooter roomNumber={roomNumber} />
    </Container>
  );
}

export default HostWaitingRoom;
