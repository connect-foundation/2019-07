import React, { useContext } from 'react';
import styled from 'styled-components';

import { YellowButton } from '../common/Buttons';
import { EditContext } from './EditContextProvider';

const ButtonWrapper = styled.div`
  position: relative;
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

function DeleteButton() {
  const { dispatch, actionTypes } = useContext(EditContext);

  function deleteQuiz() {
    dispatch({ type: actionTypes.DELETE_QUIZ });
  }

  return (
    <ButtonWrapper>
      <YellowButton onClick={deleteQuiz}>퀴즈 삭제</YellowButton>
    </ButtonWrapper>
  );
}

export default DeleteButton;
