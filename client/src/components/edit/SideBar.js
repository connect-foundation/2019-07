import React, { useEffect, useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import { YellowButton } from '../common/Buttons';
import { EditContext } from './EditContextProvider';
import Thumbnail from './Thumbnail';

const SIDE_BAR_SIZE = '20vmin';
const BUTTON_PADDING = '1vmin';
const BUTTON_FONT_SIZE = '2vmin';

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
  @media (orientation: portrait) {
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
  }
`;

function AddQuizButton({ onClick }) {
  const ButtonWrapper = styled.div`
    position: relative;
    flex: none;
    width: ${SIDE_BAR_SIZE};
    height: calc(${SIDE_BAR_SIZE} / 2);

    @media (orientation: portrait) {
      width: calc(${SIDE_BAR_SIZE} / 2);
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

  return (
    <ButtonWrapper>
      <YellowButton onClick={onClick}>퀴즈 생성</YellowButton>
    </ButtonWrapper>
  );
}

AddQuizButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function SideBar() {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset } = quizsetState;
  const thumbnailContainerRef = useRef();

  function addQuiz() {
    dispatch({ type: actionTypes.ADD_QUIZ });
  }

  useEffect(() => {
    const thumbContainer = thumbnailContainerRef.current;
    thumbContainer.scrollLeft = thumbContainer.scrollWidth;
    thumbContainer.scrollTop = thumbContainer.offsetHeight;
  }, [quizset.length]);

  return (
    <Background>
      <Container>
        <ThumbnailContainer ref={thumbnailContainerRef}>
          {quizset.map((thumbnail, index) => (
            <Thumbnail key={index} index={index} />
          ))}
        </ThumbnailContainer>
        <AddQuizButton onClick={addQuiz} />
      </Container>
    </Background>
  );
}

export default SideBar;
