import React, { useState } from 'react';
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
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  socket.emit('openRoom');
  socket.on('enterPlayer', (nickname) => {
    setPlayers([...players, nickname]);
  });

  function startQuiz() {
    socket.emit('startQuiz');
  }

  return (
    <Container>
      <Header>
        <ButtonContainer>
          <YellowButton onClick={startQuiz}>Start</YellowButton>
        </ButtonContainer>
      </Header>
      <Main>
        <PlayerCounter>대기자 {players.length}명</PlayerCounter>
        <PlayerList>
          {players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </PlayerList>
      </Main>
      <HostFooter />
    </Container>
  );
}

export default HostWaitingRoom;
