import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { YellowButton } from '../common/Buttons';
import { readQuizset } from '../../utils/fetch';
import QuizList from './QuizList';

const Background = styled.div`
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  button {
    font-size: 1.5rem;
  }
`;

const QuizContainer = styled.div`
  margin-top: 5rem;
`;

function QuizTab({ roomId, quizsetId }) {
  const history = useHistory();
  const [quizData, setQuizdata] = useState([
    {
      id: -1,
      quiz_order: -1,
      title: '퀴즈가 없으면 어떻게 될까요? 퀴즈를 생성하세요!',
      score: 0,
      time_limit: 'infinity',
    },
  ]);

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
    if (!quizsetId) return;

    readQuizset(quizsetId).then(response => {
      if (!response.isSuccess) {
        alert('오류로 인해 퀴즈 데이터를 받는 데 실패했습니다');
      }
      const quizset = response.data.quizset.sort((quiz1, quiz2) => {
        return quiz1.quiz_order - quiz2.quiz_order;
      });
      setQuizdata(quizset);
    });
  }, [quizsetId]);

  return (
    <Background>
      <ButtonContainer>
        <YellowButton onClick={editPage}>
          {quizsetId === undefined ? '퀴즈 생성' : '퀴즈 편집'}
        </YellowButton>
      </ButtonContainer>
      <QuizContainer>
        <QuizList quizData={quizData} />
      </QuizContainer>
    </Background>
  );
}

QuizTab.defaultProps = {
  quizsetId: undefined,
};

QuizTab.propTypes = {
  roomId: PropTypes.number.isRequired,
  quizsetId: PropTypes.number,
};

export default QuizTab;
