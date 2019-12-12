import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { YellowButton } from '../common/Buttons';
import { EditContext } from './EditContextProvider';
import * as fetcher from '../../utils/fetch';

const ButtonWrapper = styled.div`
  position: absolute;
  right: 2vmin;
  top: 50%;
  transform: translateY(-50%);

  div.buttonWrapper {
    display: inline-block;
  }
  button {
    font-size: 2vmin;
    padding: 1vmin 2vmin;
  }
`;

const refineQuiz = ({ id, title, imagePath, quizOrder, score, timeLimit }) => {
  return { id, title, imagePath, quizOrder, score, timeLimit };
};
const refineItem = ({ id, title, isAnswer, itemOrder }) => {
  return { id, title, isAnswer, itemOrder };
};

function findReadedQuiz(quizId, readedQuizset) {
  const [readedQuiz] = readedQuizset.filter(quiz => quiz.id === quizId);
  return readedQuiz;
}

function isQuizUpdated(quiz, readedQuizset) {
  const readedQuiz = findReadedQuiz(quiz.id, readedQuizset);
  return (
    JSON.stringify(refineQuiz(quiz)) !== JSON.stringify(refineQuiz(readedQuiz))
  );
}

function isItemUpdated(item, readedItem) {
  return (
    JSON.stringify(refineItem(item)) !== JSON.stringify(refineItem(readedItem))
  );
}

async function createItems(quizId, items) {
  const refinedItems = items.reduce((array, item) => {
    return [...array, refineItem(item)];
  }, []);
  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSucess } = await fetcher.createItems(quizId, refinedItems);
}

async function updateItem(item) {
  const refinedItem = refineItem(item);
  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSuccess } = await fetcher.updateItem(refinedItem);
}

async function createQuiz(quizsetId, quiz) {
  const refinedQuiz = refineQuiz(quiz);
  const { isSuccess, data } = await fetcher.createQuiz(quizsetId, refinedQuiz);
  if (!isSuccess) return;
  const { quizId } = data;
  createItems(quizId, quiz.items);
}

async function updateQuiz(quiz, readedQuizset) {
  if (!isQuizUpdated(quiz, readedQuizset)) return;
  const refinedQuiz = refineQuiz(quiz);
  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSuccess } = await fetcher.updateQuiz(refinedQuiz);
}

async function deleteQuiz(quiz) {
  const quizId = quiz.id;
  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSuccess } = await fetcher.deleteQuiz(quizId);
}

function updateItems(quiz, readedQuizset) {
  const readedQuiz = findReadedQuiz(quiz.id, readedQuizset);
  for (let index = 0; index < 4; index += 1) {
    const item = quiz.items[index];
    const readedItem = readedQuiz.items[index];
    if (isItemUpdated(item, readedItem)) updateItem(item);
  }
}

async function updateQuizzes(quizset, quizsetId, readedQuizset) {
  quizset.forEach(quiz => {
    const isNewQuiz = quiz.id === undefined;
    if (isNewQuiz) {
      createQuiz(quizsetId, quiz);
      return;
    }
    updateItems(quiz, readedQuizset);
    updateQuiz(quiz, readedQuizset);
  });
}

async function createQuizset(roomId, quizset) {
  const { isSuccess, data } = await fetcher.createQuizset(roomId, quizset);
  if (!isSuccess) return undefined;
  return data.quizsetId;
}

async function readQuizsetId(quizsetState, roomId, quizsetTitle, quizsetOrder) {
  const quizsetId =
    quizsetState.quizsetId === undefined
      ? quizsetState.quizsetId
      : await createQuizset(roomId, quizsetTitle, quizsetOrder);
  return quizsetId;
}

async function updateQuizset(quizset, quizsetId, quizsetState) {
  const { readedQuizset, deletedQuizzes } = quizsetState;
  deletedQuizzes.forEach(quiz => deleteQuiz(quiz));
  updateQuizzes(quizset, quizsetId, readedQuizset);
  return quizsetId;
}

function checkItemsCanSave(items) {
  return items.reduce(
    (result, item, index) => {
      //보기 중 정답체크가 하나라도 되어있으면 true, 아니면 false
      const isAnswer = result.isAnswer || item.isAnswer === 1;
      //보기1과 보기2의 title이 비어있지 않을때 true 둘 중 하나라도 비어있으면 false
      const title =
        index < 2 ? result.title && item.title.length > 0 : result.title;
      return { isAnswer, title };
    },
    { isAnswer: false, title: true },
  );
}

function alertMustFill({ index, quizTitle, isAnswer, itemTitle }) {
  const quizTitleMessage = quizTitle ? '' : `퀴즈 제목을 입력해주세요`;
  const isAnswerMessage = isAnswer ? '' : `정답을 하나 이상 선택해주세요`;
  const itemTitleMessage = itemTitle
    ? ''
    : `보기1과 보기2는 필수 입력 사항입니다`;
  alert(`${index + 1}번 퀴즈의 필수 항목을 입력해주세요
   ${quizTitleMessage}
   ${isAnswerMessage}
   ${itemTitleMessage}
  `);
}

function checkQuizsetCanSave(quizset, changeCurrentIndex) {
  for (let index = 0; index < quizset.length; index += 1) {
    const quiz = quizset[index];
    const quizTitle = quiz.title.length > 0;
    const { isAnswer, title } = checkItemsCanSave(quiz.items);
    if (!(quizTitle && isAnswer && title)) {
      changeCurrentIndex(index);
      alertMustFill({ index, quizTitle, isAnswer, itemTitle: title });
      return false;
    }
  }
  return true;
}

function moveToDetailPage(history, roomId) {
  history.push({
    pathname: '/host/room/detail',
    state: {
      roomId,
    },
  });
}

function SaveButton({ history }) {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, roomId } = quizsetState;

  function changeCurrentIndex(currentIndex) {
    dispatch({ type: actionTypes.UPDATE_CURRENT_INDEX, currentIndex });
  }

  return (
    <ButtonWrapper>
      <YellowButton
        onClick={async () => {
          if (!checkQuizsetCanSave(quizset, changeCurrentIndex)) return;

          const quizsetId = await readQuizsetId(quizsetState, roomId);
          await updateQuizset(quizset, quizsetId, quizsetState);
          moveToDetailPage(history, roomId);
        }}
      >
        저장
      </YellowButton>
    </ButtonWrapper>
  );
}

SaveButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SaveButton;
