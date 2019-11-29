import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as colors from "../../constants/colors";

// styled-components...

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
    score: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired,
  handlePreviewClick: PropTypes.func.isRequired
};

export default Preview;
