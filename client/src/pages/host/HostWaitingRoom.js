import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import * as colors from "../../constants/colors";
import Header from "../../components/common/Header";
import HostFooter from "../../components/inGame/HostFooter";
import { YellowButton } from "../../components/common/Buttons";

/**
 * 코드리뷰를 위해 일부 컴포넌트는 삭제되어 있습니다.
 * styled component: Container, ButtonContainer, RoomInformation, Main, PlayerCounter, PlayerList
 */

function HostWaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  useEffect(() => {
    socket.emit("openRoom");
    socket.on("openRoom", roomCode => {
      setRoomNumber(roomCode.roomNumber);
    });

    return () => {
      socket.emit("closeRoom");
    };
  }, []);

  socket.on("enterPlayer", playerList => {
    setPlayers(playerList);
  });

  socket.on("leavePlayer", playerList => {
    setPlayers(playerList);
  });

  function startQuiz() {
    socket.emit("startQuiz", { roomNumber });
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
