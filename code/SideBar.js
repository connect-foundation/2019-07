import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as colors from "../../constants/colors";
import { YellowButton } from "../common/Buttons";
import Preview from "./Preview";

const quizDefaultTemplate = {
  title: "",
  image: "",
  items: [
    {
      title: ""
    },
    {
      title: ""
    },
    {
      title: ""
    },
    {
      title: ""
    }
  ],
  answers: [],
  timeLimit: 30,
  score: 1000
};

// styled-components...

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
  setQuizFocusedIndex: PropTypes.func.isRequired
};

export default SideBar;
