import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { Prompt } from "react-router";

function PlayerGameRoom({ location, history }) {
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  /**
   * 소켓의 연결이 끊어지지 않게 하기 위해 게임 진행의 경우 SPA로 제작하고 있습니다.
   *
   * 게임 진행 창에는
   * 1. 대기화면
   * 2. 로딩화면
   * 3. 게임화면
   * 4. 중간결과화면
   *
   * 으로 이루어져있고,
   * 다른 상태로 넘어가는데 useState로 상황별 변수를 두어 넘어가고 있습니다.
   *
   * 앞으로 각 상황별로 state를 두기보다, 하나의 state에서
   * 상황별로 문자열로 'waiting', 'loading', 'quiz', 'subresult' 로 상태를 변화시켜
   * 각 화면을 설정하려고 하는데, 이 방법이 괜찮은지 궁금합니다.
   */

  const [isQuizStart, setQuizStart] = useState(false);
  const [isLoadingOver, setLoadingOver] = useState(false);
  const [isCurrentQuizOver, setCurrentQuizOver] = useState(false);
  const [quizSet, setQuizSet] = useState({});
  const [currentIndex, setCurrentQuiz] = useState(-1);

  useEffect(() => {
    socket.emit("enterPlayer", {
      nickname: location.state.nickname,
      roomNumber: location.state.roomNumber
    });

    return () => {
      socket.emit("leavePlayer", {
        nickname: location.state.nickname,
        roomNumber: location.state.roomNumber
      });
    };
  }, []);

  socket.on("start", () => {
    setQuizStart(true);
    setCurrentQuizOver(false);
  });

  // 다음 문제 (새로운 문제) 시작;
  socket.on("next", nextQuizIndex => {
    setCurrentQuiz(nextQuizIndex);

    setCurrentQuizOver(false);
    setLoadingOver(true);
  });

  // 현제 문제 제한시간 끝, 중간 결과 페이지 출력
  socket.on("break", () => {
    setCurrentQuizOver(true);
  });

  // 현제 문제 제한시간 끝, 중간 결과 페이지 출력
  socket.on("end", () => {
    setCurrentQuizOver(true);
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
      <Prompt message="페이지를 이동하면 방에서 나가게 됩니다. 계속 하시겠습니까?" />
      {!isQuizStart && <PlayerWaiting />}
      {isQuizStart && !isLoadingOver && (
        <PlayerQuizLoading
          setQuizSet={setQuizSet}
          roomNumber={location.state.roomNumber}
        />
      )}
      {isQuizStart && isLoadingOver && !isCurrentQuizOver && (
        <PlayerQuiz quizSet={quizSet} currentIndex={currentIndex} />
      )}
      {isQuizStart && isLoadingOver && isCurrentQuizOver && <PlayerSubResult />}

      <PlayerFooter nickname={location.state.nickname} />
    </Container>
  );
}

PlayerGameRoom.propTypes = {
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

export default PlayerGameRoom;
