import React, { useContext } from 'react';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import Header from '../common/Header';
import { YellowButton } from '../common/Buttons';
import { HostGameAction, HostGameContext } from '../../reducer/hostGameReducer';

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  button {
    font-size: 1.5rem;
  }
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    button {
      font-size: 2rem;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  padding: 4vmin 4vmin 2vmin 4vmin;
  overflow: hidden;
`;

const InfomationArea = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 5vmin;
  color: ${colors.TEXT_BLACK};
  margin-bottom: 1vmin;
`;

const RoomInformation = styled.div`
  position: relative;

  &::before {
    content: '방 번호 ';
    user-select: none;
  }
`;

const PlayerCount = styled.div`
  position: relative;
  user-select: none;
`;

const PlayerList = styled.ul`
  background-color: white;
  flex: 1;
  overflow-y: auto;
  box-shadow: 0 0 1px 1px ${colors.BORDER_DARK_GRAY};
  border-radius: 5px;

  li {
    display: inline-block;
    margin: 1rem;
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.TEXT_BLACK};
  }

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    li {
      font-size: 3rem;
    }
  }
`;

function HostWaitingRoom() {
  const { roomState, dispatcher } = useContext(HostGameContext);
  function startQuiz() {
    dispatcher({ type: HostGameAction.GAME_START });
  }
  return (
    <>
      <Header>
        <ButtonContainer>
          <YellowButton onClick={startQuiz}>퀴즈 시작</YellowButton>
        </ButtonContainer>
      </Header>
      <Main>
        <InfomationArea>
          <RoomInformation>
            <strong>{roomState.roomNumber}</strong>
          </RoomInformation>
          <PlayerCount>{`대기자 ${roomState.players.length}명`}</PlayerCount>
        </InfomationArea>
        <PlayerList>
          {roomState.players.map(player => (
            <li key={player.nickname}>{player.nickname}</li>
          ))}
        </PlayerList>
      </Main>
    </>
  );
}

export default HostWaitingRoom;
