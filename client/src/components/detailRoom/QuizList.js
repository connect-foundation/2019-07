import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TEXT_BLACK, BACKGROUND_LIGHT_WHITE } from '../../constants/colors';
import multipleChoiceImage from '../../assets/images/multiple_choice.svg';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const QuizSet = styled.div`
  display: flex;
  position: relative;
  background-color: ${BACKGROUND_LIGHT_WHITE};
  margin-bottom: 2vmin;
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  padding: 1rem;
  color: ${TEXT_BLACK};
  flex-wrap: nowrap;
`;

const QuizImage = styled.img.attrs({
  src: multipleChoiceImage,
})`
  width: 10rem;
  margin-right: 1rem;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 20rem;
  }
`;

const QuizInformation = styled.div`
  width: calc(100% - 11rem);
  h1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  p {
    display: inline-block;
    font-size: 1.5rem;
    position: absolute;
    bottom: 1rem;
    span:last-child {
      margin-left: 1rem;
    }
  }
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    max-width: calc(100% - 22rem);
    span {
      font-size: 1.5rem;
    }
    h1 {
      font-size: 2.5rem;
    }
  }
`;

function QuizList({ quizData }) {
  return (
    <>
      {quizData.map(quiz => (
        <QuizSet key={quiz.id}>
          <QuizImage />
          <QuizInformation>
            <span>문제 {quiz.quiz_order + 1}</span>
            <h1 title={quiz.title}>{quiz.title}</h1>
            <p>
              <span role="img" aria-label="Celebrate">
                🎉
              </span>
              {quiz.score}점
              <span role="img" aria-label="Timer">
                ⏱
              </span>
              {quiz.time_limit}초
            </p>
          </QuizInformation>
        </QuizSet>
      ))}
    </>
  );
}

QuizList.propTypes = {
  quizData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuizList;
