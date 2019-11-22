import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import io from "socket.io-client";
import PropTypes from "prop-types";
import * as colors from "../../constants/colors";
import PlayerFooter from "../../components/inGame/PlayerFooter";
import ProgressBar from "../../components/inGame/ProgressBar";
import DESKTOP_MIN_WIDTH from "../../constants/media";

/**
 * 코드리뷰를 위해 일부 컴포넌트는 삭제되어 있습니다.
 * styled component: Container, Main, LoadingAnimation, LoadigImage, LoadingText, Saying
 * jsx component: BeforeStart(), AfterStart()
 */

function PlayerWaitingRoom({ location, history }) {
  const [isQuizStart, setQuizStart] = useState(false);
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  useEffect(() => {
    socket.emit("enterPlayer", {
      nickname: location.state.nickname,
      roomNumber: location.state.roomNumber
    });

    return () => {
      /**
       * react-router의 Prompt를 사용하면 페이지를 나가는 것을 막을 수 있지만
       * 아래 closeRoom 수신 시 history.push가 정상동작하지 않는 문제가 있음.
       */
      socket.emit("leavePlayer", {
        nickname: location.state.nickname,
        roomNumber: location.state.roomNumber
      });
    };
  }, []);

  socket.on("startQuiz", () => {
    setQuizStart(true);
  });

  socket.on("closeRoom", () => {
    /**
     * 사용자에게 Modal로 방이 닫혔음을 알림
     * 사용자가 어떤 형태로든 창을 닫으면 경로를 바꾼다.
     */
    history.push({
      pathname: "/"
    });
  });

  return (
    <Container>
      <Main>{!isQuizStart ? BeforeStart() : AfterStart()}</Main>
      <PlayerFooter nickname={location.state.nickname} />
    </Container>
  );
}

PlayerWaitingRoom.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default PlayerWaitingRoom;
