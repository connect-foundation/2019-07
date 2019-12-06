import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { Prompt } from "react-router";

import PlayerFooter from "../../components/inGame/PlayerFooter";
import PlayerWaiting from "../../components/inGame/PlayerWaiting";
import PlayerQuizLoading from "../../components/inGame/PlayerQuizLoading";
import PlayerQuiz from "../../components/inGame/PlayerQuiz";
import PlayerSubResult from "../../components/inGame/PlayerSubResult";
import PlayerResult from "../../components/inGame/PlayerResult";

/**
 * string 으로 형태를 바꾸었습니다
 */
const VIEW_STATE = {
  WAITING: "WAITING",
  IN_QUIZ: "INQUIZ",
  LOADING: "LOADING",
  SUB_RESULT: "SUBRESULT",
  END: "END"
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

function PlayerGameRoom({ location, history }) {
  /**
   * Cannot read property 에러의 경우 state가 없는 경우이므로
   * state가 undefined인지 검사해주어 safe guard 처리를 하고 있습니다
   *
   * 이런 방법으로 사용자의 비정상적인 접근을 대부분 처리할 수 있는지 궁금합니다
   *
   * 예를들어 다른페이지에서 state가 설정되어 있지만, 아래에서 사용하는 property가
   * 아닌 다른 property를 가진 채로 들어올 수 있기 때문입니다
   */
  if (!location.state) {
    window.location.href = "/";
  }

  // ...

  return (
    <Container>
      <Prompt message="페이지를 이동하면 방에서 나가게 됩니다. 계속 하시겠습니까?" />
      {viewState === VIEW_STATE.WAITING && <PlayerWaiting />}
      {viewState === VIEW_STATE.LOADING && (
        <PlayerQuizLoading setQuizSet={setQuizSet} roomNumber={roomNumber} />
      )}
      {viewState === VIEW_STATE.IN_QUIZ && (
        <PlayerQuiz
          quizSet={quizSet}
          roomNumber={roomNumber}
          quizIndex={quizIndex}
          setChoose={setChoose}
        />
      )}
      {viewState === VIEW_STATE.SUB_RESULT && (
        <PlayerSubResult
          choose={choose}
          score={score}
          setScore={setScore}
          nickname={nickname}
          roomNumber={roomNumber}
          quizIndex={quizIndex}
        />
      )}
      {viewState === VIEW_STATE.END && (
        <PlayerResult
          ranking={ranking}
          roomNumber={roomNumber}
          nickname={nickname}
        />
      )}

      <PlayerFooter nickname={nickname} score={score} />
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
