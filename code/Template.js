import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as colors from "../../constants/colors";
import ItemCard from "./ItemCard";
import TimeLimitPicker from "./TimeLimitPicker";
import ScorePicker from "./ScorePicker";
import FlexibleInput from "../common/FlexibleInput";
import emptyImage from "../../assets/images/emptyImage.png";
import { WhiteButton } from "../common/Buttons";
import { deepCopy } from "../../utils/util";

const itemColors = colors.ITEM_COLOR;
const itemAnswerTemplate = [false, false, false, false];

// styled-components...

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
    convertAnswersToJSFormat(quiz.answers)
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
    score: PropTypes.number.isRequired
  }).isRequired,
  quizIndex: PropTypes.number.isRequired,
  quizSet: PropTypes.arrayOf(Object).isRequired,
  setQuizSet: PropTypes.func.isRequired
};

export default Template;
