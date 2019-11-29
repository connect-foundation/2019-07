import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';

const PreviewWrapper = styled.div`
  position: relative;
  width: 85%;
  height: 10rem;
  margin: 1rem auto 2rem auto;
`;

const PreviewNumber = styled.div`
  position: absolute;
  left: 0;
  width: 10%;
  height: 100%;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
`;

const PreviewImage = styled.div`
  position: absolute;
  right: 0;
  width: 90%;
  height: 100%;
  background: ${colors.BACKGROUND_DEEP_GRAY};
  border-radius: 0.7rem;
  cursor: pointer;
  ${props =>
    props.isFocused &&
    `border: 3px solid ${colors.ITEM_COLOR[1]}; transform: translate(3px, -3px)`};
`;

function Preview({ quiz, index, isFocused, handlePreviewClick }) {
  return (
    <PreviewWrapper
      onClick={() => {
        handlePreviewClick(index);
      }}
    >
      <PreviewNumber>{index + 1}</PreviewNumber>
      <PreviewImage isFocused={isFocused}>{quiz.title}</PreviewImage>
    </PreviewWrapper>
  );
}

Preview.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(Object).isRequired,
    answers: PropTypes.arrayOf(Number).isRequired,
    timeLimit: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired,
  handlePreviewClick: PropTypes.func.isRequired,
};

export default Preview;
