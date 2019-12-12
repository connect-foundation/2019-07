import React, { useContext } from 'react';
import { EditContext } from './EditContextProvider';
import FlexibleInput from '../common/FlexibleInput';

function Title() {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex } = quizsetState;
  const { title } = quizset[currentIndex];

  function onChangeHanlder(value) {
    dispatch({ type: actionTypes.UPDATE_TITLE, title: value });
  }

  return (
    <FlexibleInput
      maxLength={120}
      placeholder="제목을 입력해주세요"
      title={title}
      callback={onChangeHanlder}
    />
  );
}

export default Title;
