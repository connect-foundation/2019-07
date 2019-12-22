import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import { YellowButton } from '../common/Buttons';
import { readQuizset, readQuizsetId } from '../../utils/fetch';
import QuizList from './QuizList';
import RoomInformation from './RoomInformation';
import InformationArea from '../common/InformationArea';
import MainContainer from '../common/MainContainer';
import Loading from '../common/Loading';

const ButtonContainer = styled.div`
  position: relative;
  button {
    font-size: 3vmin;
    padding: 0.75vmin 1.25vmin;
    transform: translateY(-0.4vmin);
  }
`;

function QuizTab({ roomId, setId }) {
  const history = useHistory();
  const [quizsetId, setQuizsetId] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [quizData, setQuizdata] = useState([]);

  function editPage() {
    history.push({
      pathname: '/edit',
      state: {
        roomId,
        quizsetId,
      },
    });
  }

  useEffect(() => {
    const initQuizData = [
      {
        id: -1,
        quiz_order: -1,
        title: '퀴즈가 없으면 어떻게 될까요? 퀴즈를 생성하세요!',
        score: 0,
        time_limit: 'infinity',
      },
    ];

    async function getQuizsetId() {
      const { isSuccess, data } = await readQuizsetId(roomId);
      if (!isSuccess) {
        setQuizdata(initQuizData);
        setLoading(false);
        return;
      }
      setQuizsetId(data.quizsetId);
      setId(data.quizsetId);
    }

    getQuizsetId();

    if (!quizsetId) {
      return;
    }

    async function getQuizset(count) {
      if (count === 0) {
        alert('오류로 인해 퀴즈 데이터를 받는 데 실패했습니다');
        setQuizdata(initQuizData);
        return;
      }

      const { isSuccess, data } = await readQuizset(quizsetId);

      if (!isSuccess) {
        getQuizset(count - 1);
        return;
      }

      const quizset = data.quizset.sort((quiz1, quiz2) => {
        return quiz1.quiz_order - quiz2.quiz_order;
      });

      setLoading(false);
      setQuizdata(quizset);
    }

    getQuizset(3);
  }, [quizsetId]);

  return (
    <MainContainer>
      <InformationArea>
        <RoomInformation roomId={roomId} />
        <ButtonContainer>
          <YellowButton onClick={editPage}>
            {quizsetId === undefined ? '퀴즈 생성' : '퀴즈 편집'}
          </YellowButton>
        </ButtonContainer>
      </InformationArea>
      {isLoading ? (
        <Loading message="퀴즈를 로딩 중입니다..." />
      ) : (
        <QuizList quizData={quizData} />
      )}
    </MainContainer>
  );
}

QuizTab.propTypes = {
  roomId: PropTypes.number.isRequired,
  setId: PropTypes.func.isRequired,
};

export default QuizTab;
