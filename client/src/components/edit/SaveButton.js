import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { YellowButton } from '../common/Buttons';
import { EditContext } from './EditContextProvider';
import * as fetcher from '../../utils/fetch';

const ButtonWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
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

function isQuizUpdated(quiz, readedQuiz) {
  return (
    JSON.stringify(refineQuiz(quiz)) !== JSON.stringify(refineQuiz(readedQuiz))
  );
}

function isItemUpdated(item, readedItem) {
  return (
    JSON.stringify(refineItem(item)) !== JSON.stringify(refineItem(readedItem))
  );
}

function updateItemsOrder(items) {
  const third = items[2];
  const fourth = items[3];
  if (!(third.title.length === 0 && fourth.title.length > 0)) return items;

  function swapItem({ id }, { title, isAnswer, itemOrder }) {
    return { id, title, isAnswer, itemOrder };
  }

  const newThird = swapItem(third, fourth);
  const newFourth = swapItem(fourth, third);
  return [items[0], items[1], newThird, newFourth];
}

async function createItems(quizId, items) {
  const refinedItems = items.reduce((array, item) => {
    return [...array, refineItem(item)];
  }, []);

  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSuccess } = await fetcher.createItems(quizId, refinedItems);
}

async function updateItem(item) {
  const refinedItem = refineItem(item);
  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSuccess } = await fetcher.updateItem(refinedItem);
}

function getQuizFormData(roomId, quiz) {
  const refinedQuiz = refineQuiz(quiz);
  const formData = new FormData();
  formData.append('file', quiz.imageFile);
  formData.append('roomId', roomId);
  Object.keys(refinedQuiz).forEach(key => {
    if (key === 'imagePath') return;
    formData.append(key, refinedQuiz[key]);
  });
  return formData;
}

async function createQuiz(roomId, quizsetId, quiz) {
  const formData = getQuizFormData(roomId, quiz);
  formData.append('quizsetId', quizsetId);
  const { isSuccess, data } = await fetcher.createQuiz(formData);
  if (!isSuccess) return undefined;
  const { quizId } = data;
  return quizId;
}

async function updateQuiz(roomId, quiz, readedQuiz) {
  if (!isQuizUpdated(quiz, readedQuiz)) return;
  const formData = getQuizFormData(roomId, quiz);

  if (readedQuiz.imagePath && !quiz.imagePath)
    formData.append('requestDeleteImage', true);
  const { isSuccess } = await fetcher.updateQuiz(formData);
}

async function deleteQuiz(roomId, quizId) {
  //isSuccess가 실패할 경우 재요청하거나 오류를 알려줘야함
  const { isSuccess } = await fetcher.deleteQuiz(roomId, quizId);
}

function updateItems(items, readedQuiz) {
  for (let index = 0; index < 4; index += 1) {
    const item = items[index];
    const readedItem = readedQuiz.items[index];
    if (isItemUpdated(item, readedItem)) updateItem(item);
  }
}

function updateQuizzes(roomId, quizset, quizsetId, readedQuizset) {
  quizset.forEach(async quiz => {
    const items = updateItemsOrder(quiz.items);
    const isNewQuiz = quiz.id === undefined;
    if (isNewQuiz) {
      const quizId = await createQuiz(roomId, quizsetId, quiz);
      createItems(quizId, items);
      return;
    }
    const readedQuiz = findReadedQuiz(quiz.id, readedQuizset);
    updateItems(items, readedQuiz);
    updateQuiz(roomId, quiz, readedQuiz);
  });
}

async function createQuizset(roomId, quizset) {
  const { isSuccess, data } = await fetcher.createQuizset(roomId, quizset);
  if (!isSuccess) return undefined;
  return data.quizsetId;
}

async function readQuizsetId(quizsetState, roomId, quizsetTitle, quizsetOrder) {
  const quizsetId =
    quizsetState.quizsetId !== undefined
      ? quizsetState.quizsetId
      : await createQuizset(roomId, quizsetTitle, quizsetOrder);
  return quizsetId;
}

async function updateQuizset(roomId, quizset, quizsetId, quizsetState) {
  const { readedQuizset, deletedQuizzes } = quizsetState;
  deletedQuizzes.forEach(quiz => deleteQuiz(roomId, quiz.id));
  updateQuizzes(roomId, quizset, quizsetId, readedQuizset);
  return quizsetId;
}

function checkItemsCanSave(items) {
  return items.reduce(
    (state, item, index) => {
      const titleArray =
        item.title.length === 0
          ? state.titleArray
          : [...state.titleArray, item.title];
      //보기 중 정답체크가 하나라도 되어있으면 true, 아니면 false
      const isAnswer = state.isAnswer || item.isAnswer === 1;
      //보기1과 보기2의 title이 전부 입력했으면 true 하나라도 비어있으면 false
      const essentialTitle =
        index < 2
          ? state.essentialTitle && item.title.length > 0
          : state.essentialTitle;

      const hasDuplicateTitle = state.titleArray.indexOf(item.title) >= 0;
      //items에서 중복된 title이 있는지 여부를 판단함
      const duplicateTitle = state.duplicateTitle || hasDuplicateTitle;
      return { titleArray, isAnswer, essentialTitle, duplicateTitle };
    },
    {
      titleArray: [],
      isAnswer: false,
      essentialTitle: true,
      duplicateTitle: false,
    },
  );
}

function alertMustFill({
  index,
  quizTitle,
  isAnswer,
  essentialTitle,
  duplicateTitle,
}) {
  const indexMessage = `${index + 1}번 퀴즈의 필수 항목을 입력해주세요\n`;
  const quizTitleMessage = quizTitle ? '' : `\n퀴즈 제목을 입력해주세요`;
  const isAnswerMessage = isAnswer ? '' : `\n정답을 하나 이상 선택해주세요`;
  const essentialTitleMessage = essentialTitle
    ? ''
    : `\n보기1번과 보기2번은 필수 입력 항목입니다`;
  const duplicateTitleMessage = duplicateTitle
    ? `\n보기는 중복 입력이 불가능합니다`
    : '';
  const messages = [
    quizTitleMessage,
    isAnswerMessage,
    essentialTitleMessage,
    duplicateTitleMessage,
  ];
  const alertMessage = messages.reduce(
    (result, message) => `${result}${message}`,
    indexMessage,
  );
  // eslint-disable-next-line no-alert
  alert(alertMessage);
}

function checkQuizsetCanSave(quizset, changeCurrentIndex) {
  for (let index = 0; index < quizset.length; index += 1) {
    const quiz = quizset[index];
    const quizTitle = quiz.title.length > 0;
    const { isAnswer, essentialTitle, duplicateTitle } = checkItemsCanSave(
      quiz.items,
    );
    if (!(quizTitle && isAnswer && essentialTitle && !duplicateTitle)) {
      changeCurrentIndex(index);
      alertMustFill({
        index,
        quizTitle,
        isAnswer,
        essentialTitle,
        duplicateTitle,
      });
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

function SaveButton() {
  const history = useHistory();
  const { quizsetState, dispatch, actionTypes, loadingTypes } = useContext(
    EditContext,
  );
  const { quizset, roomId, loadingType } = quizsetState;

  function changeCurrentIndex(currentIndex) {
    dispatch({ type: actionTypes.UPDATE_CURRENT_INDEX, currentIndex });
  }

  function changeLoading(type) {
    dispatch({ type: actionTypes.CHANGE_LOADING, loadingType: type });
  }

  useEffect(() => {
    if (loadingType !== loadingTypes.UPDATE_DATA) return;
    async function communicateWithServer() {
      const quizsetId = await readQuizsetId(quizsetState, roomId);
      await updateQuizset(roomId, quizset, quizsetId, quizsetState);
      changeLoading(loadingTypes.IDLE);
      moveToDetailPage(history, roomId);
    }
    communicateWithServer();
  }, [loadingType]);

  return (
    <ButtonWrapper>
      <YellowButton
        onClick={async () => {
          if (!checkQuizsetCanSave(quizset, changeCurrentIndex)) return;
          changeLoading(loadingTypes.UPDATE_DATA);
        }}
      >
        저장
      </YellowButton>
    </ButtonWrapper>
  );
}

export default SaveButton;
