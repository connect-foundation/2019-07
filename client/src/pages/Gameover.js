import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../components/common/Buttons';

const words = ['G', 'A', 'M', 'E', 'O', 'V', 'E', 'R'];
const CONTAINER_SIZE_PERCENT = 80;
const MOVING_DELAY = 0.1;
const MOVING_DURATION = 0.5;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const WordContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  width: ${CONTAINER_SIZE_PERCENT}vmin;
  height: ${CONTAINER_SIZE_PERCENT}vmin;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WordMovingAnimation = keyframes`
  from{
    top: 100%;
  }
  to{
    top: 0%;
  }
`;

const WordStyle = css`
  position: absolute;
  text-align: center;
  left: -1vmin;
  top: -1vmin;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  div.buttonWrapper {
    position: absolute;
    display: inline-block;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -100%);
  }
  button {
    font-size: 5vh;
    padding: 1vh 4vw;
  }
`;

function getRandomInt(min, max) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

function getRandomColor() {
  const max = 256;
  const r = getRandomInt(0, max);
  const g = getRandomInt(0, max);
  const b = getRandomInt(0, max);
  return `rgb(${r}, ${g}, ${b})`;
}

function getColorChangeAnimation(index) {
  const percents = [];
  const percentRate = 11.5;
  for (let i = 0; i < words.length; i += 1)
    percents.push(percentRate * (i + 1));
  return keyframes`
        0%{
          color: white;
          transform: scale(1);
        }
        ${percents.map(
          (percent, order) => `${percent}%{
        color: ${getRandomColor()};
        transform: scale(${index === order ? 1.4 : 1});
    }`,
        )}
        100%{
          color: white;
          transform: scale(1);
        }
  `;
}

function Word({ word, index }) {
  const colorChangeDelay = MOVING_DURATION + MOVING_DELAY * 8;

  const WordWrapper = styled.div`
    position: relative;
    display: inline-block;
    color: gray;
    font-size: ${CONTAINER_SIZE_PERCENT / 4}vmin;
    text-align: center;
    font-weight: bold;
    width: 25%;
    top: 100%;
    user-select: none;
    animation-name: ${WordMovingAnimation};
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-duration: ${MOVING_DURATION}s;
    animation-delay: ${index * MOVING_DELAY}s;

    &::before {
      ${WordStyle}
      content: '${word}';
      color: white;
    }

    &::after {
      ${WordStyle}
      content: '${word}';
      font-size: 95%;
      color: white;

    animation-name: ${getColorChangeAnimation(index)};
      animation-delay: ${colorChangeDelay}s;
      animation-duration: 5s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
    }
  `;
  return <WordWrapper>{word}</WordWrapper>;
}

function GameOver() {
  return (
    <Background>
      <WordContainer>
        {words.map((word, index) => (
          <Word key={index} word={word} index={index} />
        ))}
      </WordContainer>
      <ButtonWrapper>
        <Link to="/">
          <Button backgroundColor="red" fontColor="white">
            RETRY
          </Button>
        </Link>
      </ButtonWrapper>
    </Background>
  );
}

Word.propTypes = {
  word: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default GameOver;
