import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';

import PlayerFooter from '../../components/inGame/PlayerFooter';
import PlayerWaiting from '../../components/inGame/PlayerWaiting';
import PlayerQuizLoading from '../../components/inGame/PlayerQuizLoading';
import PlayerQuiz from '../../components/inGame/PlayerQuiz';
import PlayerSubResult from '../../components/inGame/PlayerSubResult';
import PlayerResult from '../../components/inGame/PlayerResult';

const VIEW_STATE = {
  WAITING: 'WAITING',
  IN_QUIZ: 'INQUIZ',
  LOADING: 'LOADING',
  SUB_RESULT: 'SUBRESULT',
  END: 'END',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

function PlayerGameRoom({ location, history }) {
  const { nickname, roomNumber } = location.state;

  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  const [viewState, setViewState] = useState(VIEW_STATE.WAITING);

  const [quizSet, setQuizSet] = useState({});
  const [quizIndex, setCurrentQuiz] = useState(-1);

  const [choose, setChoose] = useState(-1);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    socket.emit('enterPlayer', {
      nickname: location.state.nickname,
      roomNumber: location.state.roomNumber,
    });

    return () => {
      socket.emit('leavePlayer', {
        nickname: location.state.nickname,
        roomNumber: location.state.roomNumber,
      });
    };
  }, []);

  socket.on('start', () => {
    setViewState(VIEW_STATE.LOADING);
  });

  // 다음 문제 (새로운 문제) 시작;
  socket.on('next', nextQuizIndex => {
    setCurrentQuiz(nextQuizIndex);

    setViewState(VIEW_STATE.IN_QUIZ);
  });

  // 현제 문제 제한시간 끝, 중간 결과 페이지 출력
  socket.on('break', () => {
    setViewState(VIEW_STATE.SUB_RESULT);
  });

  // 현재 방의 문제 세트 끝,
  socket.on('end', orderedRanking => {
    setRanking(orderedRanking);
    setViewState(VIEW_STATE.END);
  });

  socket.on('closeRoom', () => {
    /**
     * 사용자에게 Modal로 방이 닫혔음을 알림
     * 사용자가 어떤 형태로든 창을 닫으면 경로를 바꾼다.
     */
    history.push({
      pathname: '/',
    });
  });

  /**
   * react-router의 Prompt를 사용하면 페이지를 나가는 것을 막을 수 있지만
   * 아래 closeRoom 수신 시 history.push가 정상동작하지 않는 문제가 있음.
   */
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
          score={score}
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
      roomNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlayerGameRoom;
