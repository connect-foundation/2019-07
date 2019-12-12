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
import PlayerWarning from '../../components/inGame/PlayerWarning';

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

function PlayerGameRoom({ location }) {
  /**
   * Cannot read property 에러의 경우 state가 없는 경우이므로
   * state가 undefined인지 검사해주면 된다.
   * 검사 후 문제가 있는 경우 메인페이지로 강제 이동시킴
   */
  if (!location.state) {
    window.location.href = '/';
  }
  const { nickname, roomNumber } = location.state;

  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);

  const [viewState, setViewState] = useState(VIEW_STATE.WAITING);

  const [quizSet, setQuizSet] = useState({});
  const [quizIndex, setCurrentQuiz] = useState(-1);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [isAnswer, setIsAnswer] = useState(false);

  function blockClose(e) {
    e.returnValue = 'warning';
  }

  useEffect(() => {
    socket.emit('enterPlayer', {
      nickname: location.state.nickname,
      roomNumber: location.state.roomNumber,
    });

    window.addEventListener('unload', () => {
      if (document.readyState !== 'complete') {
        socket.emit('leavePlayer', {
          nickname: location.state.nickname,
          roomNumber: location.state.roomNumber,
        });
      }
    });

    return () => {
      socket.emit('leavePlayer', {
        nickname: location.state.nickname,
        roomNumber: location.state.roomNumber,
      });
      window.removeEventListener('beforeunload', blockClose);
    };
  }, []);

  socket.on('start', () => {
    setViewState(VIEW_STATE.LOADING);
    window.addEventListener('beforeunload', blockClose);
  });

  // 다음 문제 (새로운 문제) 시작;
  socket.on('next', nextQuizIndex => {
    setCurrentQuiz(nextQuizIndex);
    setViewState(VIEW_STATE.IN_QUIZ);
  });

  // 현재 문제 제한시간 끝, 중간 결과 페이지 출력
  socket.on('break', () => {
    setViewState(VIEW_STATE.SUB_RESULT);
  });

  // 현재 방의 문제 세트 끝,
  socket.on('end', orderedRanking => {
    window.removeEventListener('beforeunload', blockClose);
    setViewState(VIEW_STATE.END);
    setRanking(orderedRanking);
    socket.close();
  });

  socket.on('closeRoom', () => {
    window.removeEventListener('beforeunload', blockClose);
    window.location.href = '/';
  });

  socket.on('settingScore', existedScore => {
    setScore(existedScore);
  });

  return (
    <Container>
      {viewState !== VIEW_STATE.END && viewState !== VIEW_STATE.WAITING && (
        <Prompt message="페이지를 이동하면 방에서 나가게 됩니다. 계속 하시겠습니까?" />
      )}
      {viewState === VIEW_STATE.WAITING && (
        <PlayerWaiting setQuizSet={setQuizSet} roomNumber={roomNumber} />
      )}
      {viewState === VIEW_STATE.LOADING && <PlayerQuizLoading />}
      {quizSet[quizIndex] !== undefined && (
        <>
          {viewState === VIEW_STATE.IN_QUIZ && (
            <PlayerQuiz
              quizSet={quizSet}
              roomNumber={roomNumber}
              quizIndex={quizIndex}
              setIsAnswer={setIsAnswer}
              nickname={nickname}
            />
          )}
          {viewState === VIEW_STATE.SUB_RESULT && (
            <PlayerSubResult
              plusScore={quizSet[quizIndex].score}
              score={score}
              setScore={setScore}
              isAnswer={isAnswer}
            />
          )}
        </>
      )}
      {!quizSet[quizIndex] &&
        viewState !== VIEW_STATE.LOADING &&
        viewState !== VIEW_STATE.WAITING &&
        viewState !== VIEW_STATE.END && <PlayerWarning />}
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
      roomNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlayerGameRoom;
