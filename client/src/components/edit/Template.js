import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import ItemCard from './ItemCard';
import TimeLimitPicker from './TimeLimitPicker';
import ScorePicker from './ScorePicker';
import FlexibleInput from '../common/FlexibleInput';
import emptyImage from '../../assets/images/emptyImage.png';
import { WhiteButton } from '../common/Buttons';
import { deepCopy } from '../../utils/util';

const itemColors = colors.ITEM_COLOR;
const itemAnswerTemplate = [false, false, false, false];

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: calc(100% - 8rem);
  overflow-x: hidden;
  margin: 2rem;
  padding: 2rem;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 0.4rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
`;

const OptionButton = styled.img.attrs({
  src: 'https://image.flaticon.com/icons/svg/483/483345.svg',
})`
  margin-left: 1rem;
  height: 50%;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const QuizDetailContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

const QuizImageContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  flex: 1;
  margin: auto 0;
  max-width: 35vw;
`;

const QuizImageWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 75%;
  border: 2px solid ${colors.BORDER_DARK_GRAY};
  border-radius: 0.4rem;
  border-style: dashed;
  background: url(${emptyImage}) no-repeat 50% 40%;
  background-size: 5rem 5rem;
`;

const ImageAlertMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
`;

const ImageAddButtonWrapper = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;

const QuizControlContainer = styled.div`
  z-index: 5;
  position: relative;
  left: 3%;
  width: 15rem;
  height: 30rem;
  display: none;

  @media (min-width: 1000px) {
    display: block;
  }
`;

const ItemCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 25%;
`;

function convertAnswersToJSFormat(answers) {
  const newAnswers = deepCopy(itemAnswerTemplate);
  answers.forEach(index => {
    newAnswers[index] = true;
  });
  return newAnswers;
}

function convertAnswersToDataFormat(answers) {
  const newAnswers = [];
  answers.forEach((isAnswer, index) => {
    if (isAnswer) newAnswers.push(index);
  });
  return newAnswers;
}

function Template({ quiz, quizIndex, quizSet, setQuizSet }) {
  const [title, setTitle] = useState(quiz.title);
  const [timeLimit, setTimeLimit] = useState(quiz.timeLimit);
  const [score, setScore] = useState(quiz.score);
  const [itemAnswers, setItemAnswers] = useState(
    convertAnswersToJSFormat(quiz.answers),
  );
  const [items, setItems] = useState(quiz.items);

  function initStates() {
    setTitle(quiz.title);
    setTimeLimit(quiz.timeLimit);
    setScore(quiz.score);
    setItemAnswers(convertAnswersToJSFormat(quiz.answers));
    setItems(quiz.items);
  }

  // function handleTitleChange(quizTitle) {
  //   setTitle(quizTitle);
  // }

  function handleItemCheck(index, itemAnswer) {
    const newAnswers = deepCopy(itemAnswers);
    newAnswers[index] = itemAnswer;
    if (JSON.stringify(itemAnswers) === JSON.stringify(newAnswers)) return;
    setItemAnswers(newAnswers);
  }

  function handleItemTitleChange(index, itemTitle) {
    const newItems = deepCopy(items);
    newItems[index].title = itemTitle;
    if (JSON.stringify(items) === JSON.stringify(newItems)) return;
    setItems(newItems);
  }

  function updateQuizSet() {
    const newQuizSet = deepCopy(quizSet);
    newQuizSet[quizIndex].title = title;
    newQuizSet[quizIndex].items = items;
    newQuizSet[quizIndex].answers = convertAnswersToDataFormat(itemAnswers);
    newQuizSet[quizIndex].timeLimit = timeLimit;
    newQuizSet[quizIndex].score = score;
    if (JSON.stringify(quizSet) === JSON.stringify(newQuizSet)) return;
    setQuizSet(newQuizSet);
  }

  useEffect(() => {
    initStates();
  }, [quiz]);

  useEffect(() => {
    updateQuizSet();
  }, [title, itemAnswers, items, timeLimit, score]);

  return (
    <TemplateWrapper>
      <TitleWrapper>
        <FlexibleInput
          maxLength={120}
          placeholder="문제를 입력해주세요."
          title={title}
        />
        <OptionButton />
      </TitleWrapper>
      <QuizDetailContainer>
        <QuizControlContainer>
          <TimeLimitPicker timeLimit={timeLimit} setTimeLimit={setTimeLimit} />
          <ScorePicker score={score} setScore={setScore} />
        </QuizControlContainer>
        <QuizImageContainer>
          <QuizImageWrapper>
            <ImageAlertMessage>
              퀴즈의 이해를 돕기 위한 이미지를 추가할 수 있습니다.
            </ImageAlertMessage>
            <ImageAddButtonWrapper>
              <WhiteButton>이미지 추가하기</WhiteButton>
            </ImageAddButtonWrapper>
          </QuizImageWrapper>
        </QuizImageContainer>
      </QuizDetailContainer>
      <ItemCardsContainer>
        {itemColors.map((itemColor, index) => (
          <ItemCard
            key={itemColor}
            itemCardColor={itemColor}
            index={index}
            item={quiz.items[index]}
            isAnswer={itemAnswers[index]}
            handleItemCheck={handleItemCheck}
            handleItemTitleChange={handleItemTitleChange}
          />
        ))}
      </ItemCardsContainer>
    </TemplateWrapper>
  );
}

Template.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(Object).isRequired,
    answers: PropTypes.arrayOf(Boolean).isRequired,
    timeLimit: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  quizIndex: PropTypes.number.isRequired,
  quizSet: PropTypes.arrayOf(Object).isRequired,
  setQuizSet: PropTypes.func.isRequired,
};

export default Template;
