import React, { useState, useEffect, useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import { Button, YellowButton } from '../common/Buttons';
import { EditContext } from './EditContextProvider';
import Thumbnail from './Thumbnail';

const SIDE_BAR_SIZE = '20vmin';
const BUTTON_PADDING = '1vmin';
const BUTTON_FONT_SIZE = '2vmin';
const BUTTONS_CONTAINER_PADDING = '1vmin';
const BUTTON_WRAPPER_SIZE = '3.5';

const FlexStyle = css`
  display: flex;
  flex-direction: column;

  @media (orientation: portrait) {
    flex-direction: row;
  }
`;

const Background = styled.aside`
  position: relative;
  flex: none;
  width: ${SIDE_BAR_SIZE};
  height: 100%;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;

  @media (orientation: portrait) {
    width: 100%;
    height: ${SIDE_BAR_SIZE};
  }
`;

const Container = styled.div`
  ${FlexStyle};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ThumbnailContainer = styled.div`
  ${FlexStyle};
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  @media (orientation: portrait) {
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
  }
`;

const ButtonContainers = styled.div`
  ${FlexStyle};
  padding: ${BUTTONS_CONTAINER_PADDING} 0;
  @media (orientation: portrait) {
    padding: 0 ${BUTTONS_CONTAINER_PADDING};
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  flex: none;
  width: ${SIDE_BAR_SIZE};
  height: calc(${SIDE_BAR_SIZE} / ${BUTTON_WRAPPER_SIZE});

  @media (orientation: portrait) {
    width: calc(${SIDE_BAR_SIZE} / ${BUTTON_WRAPPER_SIZE});
    height: ${SIDE_BAR_SIZE};
  }

  div.buttonWrapper {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 80%;
    height: calc(${BUTTON_PADDING} * 2 + ${BUTTON_FONT_SIZE});

    @media (orientation: portrait) {
      width: calc(${BUTTON_PADDING} * 2 + ${BUTTON_FONT_SIZE});
      height: 80%;
    }
  }

  button {
    padding: ${BUTTON_PADDING};
    font-size: ${BUTTON_FONT_SIZE};
  }
`;

function AddQuizButton({ onClick }) {
  return (
    <ButtonWrapper>
      <YellowButton onClick={onClick}>퀴즈 생성</YellowButton>
    </ButtonWrapper>
  );
}

function DeleteQuizButton({ onClick }) {
  return (
    <ButtonWrapper>
      <Button onClick={onClick}>퀴즈 삭제</Button>
    </ButtonWrapper>
  );
}

const buttonPropTypes = { onClick: PropTypes.func.isRequired };

AddQuizButton.propTypes = buttonPropTypes;
DeleteQuizButton.propTypes = buttonPropTypes;

function SideBar() {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex } = quizsetState;
  const thumbnailContainerRef = useRef();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  function addQuiz() {
    dispatch({ type: actionTypes.CREATE_QUIZ });
  }

  function deleteQuiz() {
    dispatch({ type: actionTypes.DELETE_QUIZ });
  }

  function moveScroll() {
    const thumbContainer = thumbnailContainerRef.current;
    const horizontalMax =
      thumbContainer.scrollWidth - thumbContainer.offsetWidth;
    const verticalMax =
      thumbContainer.scrollHeight - thumbContainer.offsetHeight;
    const lastIndex = quizset.length - 1;
    const scrollPosition = currentIndex / lastIndex;
    thumbContainer.scrollLeft = scrollPosition * horizontalMax;
    thumbContainer.scrollTop = scrollPosition * verticalMax;
  }

  useEffect(() => {
    window.addEventListener('resize', () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight }),
    );
  }, []);

  useEffect(() => {
    moveScroll();
  }, [currentIndex, windowSize]);

  return (
    <Background>
      <Container>
        <ThumbnailContainer ref={thumbnailContainerRef}>
          {quizset.map((thumbnail, index) => (
            <Thumbnail key={index} index={index} />
          ))}
        </ThumbnailContainer>
        <ButtonContainers>
          <DeleteQuizButton onClick={deleteQuiz} />
          <AddQuizButton onClick={addQuiz} />
        </ButtonContainers>
      </Container>
    </Background>
  );
}

export default SideBar;
