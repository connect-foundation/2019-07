import React, { useContext } from 'react';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import Header from '../common/Header';
import Loading from '../common/Loading';
import { YellowButton, GrayButton } from '../common/Buttons';
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

const RoomInformation = styled.div`
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
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

const BigRoomNumber = styled.div`
  position: absolute;
  top: 10%;
  font-size: 3rem;
  color: #fff;
  width: 100%;
  z-index: 10000;
  font-weight: bold;
  transform: translateY(-50%);
  text-align: center;
  background-color: #333;
  padding: 2rem 0;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 5rem;
  }
`;

const CloseButtonContainer = styled.div`
  z-index: 10000;
`;

function HostWaitingRoom() {
  const { roomState, dispatcher } = useContext(HostGameContext);
  function startQuiz() {
    dispatcher({ type: HostGameAction.GAME_START });
  }
  function closeRoom() {
    window.location.href = '/host/room/select';
  }
  return (
    <>
      {!roomState.players.length && (
        <>
          <BigRoomNumber>방 번호 : {roomState.roomNumber}</BigRoomNumber>
          <Loading roomNumber={roomState.roomNumber} />
        </>
      )}
      <Header>
        <RoomInformation>
          방 번호 <strong>{roomState.roomNumber}</strong>
        </RoomInformation>
        <ButtonContainer>
          <YellowButton onClick={startQuiz}>퀴즈 시작</YellowButton>
        </ButtonContainer>
      </Header>
      <Main>
        <PlayerCounter>대기자 {roomState.players.length}명</PlayerCounter>
        <PlayerList>
          {roomState.players.map(player => (
            <li key={player.nickname}>{player.nickname}</li>
          ))}
        </PlayerList>
      </Main>

      <CloseButtonContainer>
        <GrayButton onClick={closeRoom}>게임 취소</GrayButton>
      </CloseButtonContainer>
    </>
  );
}

export default HostWaitingRoom;
