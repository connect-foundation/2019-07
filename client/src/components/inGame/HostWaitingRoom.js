import React, { useContext } from 'react';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import Header from '../common/Header';
import { YellowButton } from '../common/Buttons';
import { HostGameAction, HostGameContext } from '../../reducer/hostGameReducer';
import InformationArea from '../common/InformationArea';
import MainContainer from '../common/MainContainer';

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
  box-shadow: 1px 1px 3px gray;
  border-radius: 5px;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    margin: 2vmin 4vmin;
    font-size: 6vmin;
    font-weight: bold;
    color: ${colors.TEXT_BLACK};
  }
`;

function HostWaitingRoom() {
  const { roomState, dispatcher } = useContext(HostGameContext);
  function startQuiz() {
    dispatcher({ type: HostGameAction.GAME_START });
  }
  return (
    <>
      <Header
        button={<YellowButton onClick={startQuiz}>퀴즈 시작</YellowButton>}
      />
      <MainContainer>
        <InformationArea>
          <RoomInformation>
            <strong>{roomState.roomNumber}</strong>
          </RoomInformation>
          <PlayerCount>{`대기자 ${roomState.players.length}명`}</PlayerCount>
        </InformationArea>
        <PlayerList>
          {roomState.players.map(player => (
            <li key={player.nickname}>{player.nickname}</li>
          ))}
        </PlayerList>
      </MainContainer>
    </>
  );
}

export default HostWaitingRoom;
