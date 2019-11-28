import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import { YellowButton } from '../common/Buttons';
import Preview from './Preview';

const quizDefaultTemplate = {
  title: '',
  image: '',
  items: [
    {
      title: '',
    },
    {
      title: '',
    },
    {
      title: '',
    },
    {
      title: '',
    },
  ],
  answers: [],
  timeLimit: 30,
  score: 1000,
};

const SideBarWrapper = styled.aside`
  display: flex;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  flex-direction: row;
  width: 100%;
  height: 10rem;

  @media (min-width: 1000px) {
    flex-direction: column;
    width: 20rem;
    height: 100%;
  }

  @media (min-width: 1300px) {
    flex-direction: column;
    width: 25rem;
    height: 100%;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  height: 8rem;
`;

const AddTemplateButtonContainer = styled.div`
  position: relative;
  top: 1.7rem;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
`;

const PreviewContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function SideBar({ quizSet, setQuizSet, setQuizFocusedIndex }) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  function handleAddTemplateClick() {
    const newQuizSet = JSON.parse(JSON.stringify(quizSet));
    newQuizSet.push(quizDefaultTemplate);
    setQuizSet(newQuizSet);
  }
  function handlePreviewClick(index) {
    setFocusedIndex(index);
    setQuizFocusedIndex(index);
  }

  return (
    <SideBarWrapper>
      <ButtonContainer>
        <AddTemplateButtonContainer>
          <YellowButton onClick={handleAddTemplateClick}>
            새 템플릿 추가하기
          </YellowButton>
        </AddTemplateButtonContainer>
      </ButtonContainer>
      <PreviewContainer>
        {quizSet.map((quiz, index) => (
          <Preview
            key={index}
            quiz={quiz}
            index={index}
            isFocused={focusedIndex === index}
            handlePreviewClick={handlePreviewClick}
          />
        ))}
      </PreviewContainer>
    </SideBarWrapper>
  );
}

SideBar.propTypes = {
  quizSet: PropTypes.arrayOf(Object).isRequired,
  setQuizSet: PropTypes.func.isRequired,
  setQuizFocusedIndex: PropTypes.func.isRequired,
};

export default SideBar;
