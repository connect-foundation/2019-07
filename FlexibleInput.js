import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { InputStyle } from "../../styles/common";
import DESKTOP_MIN_WIDTH from "../../constants/media";
import * as colors from "../../constants/colors";

const BACKSPACE = 8;
const COUNTER_RATE = 0.5;
const PLACEHOLDER_RATE = 0.75;

const InputContainer = styled.div.attrs({
  className: "inputContainer",
})`
  position: relative;
  width: 100%;
  margin: auto;
`;

const Input = styled.div.attrs({
  contentEditable: true,
})`
  ${InputStyle}
  position:relative;
  display: inline-block;
  align-self: center;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  box-sizing: border-box;
  outline: none;
  padding: 0.5rem 1.5rem;
  font-size: ${(props) => props.mobileFontSize};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: calc(${(props) => props.mobileFontSize} * 2);
    padding: 1rem 3rem;
  }
`;

const Counter = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  opacity: ${(props) => (props.isOn ? 1 : 0)};
  transition-duration: 0.3s;
  font-size: calc(${(props) => props.mobileFontSize} * ${COUNTER_RATE});

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: calc(${(props) => props.mobileFontSize} * ${COUNTER_RATE} * 2);
  }
`;

const Placeholder = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: calc(${(props) => props.mobileFontSize} * ${PLACEHOLDER_RATE});
  font-weight: bold;
  color: ${colors.TEXT_GRAY};
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isOn ? 0 : 1)};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: calc(
      ${(props) => props.mobileFontSize} * ${PLACEHOLDER_RATE} * 2
    );
  }
`;

const FakeInput = styled.input``;

function FlexibleInput({ maxLength, mobileFontSize, placeholder, callback }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setFocus] = useState(false);

  function handleKeyDown(event) {
    if (
      event.target.innerText.length >= maxLength &&
      event.keyCode !== BACKSPACE
    ) {
      event.preventDefault();
      return false;
    }
  }

  function cutTailText(text) {
    return text.substring(0, maxLength);
  }

  function handleInput(event) {
    const value = event.target.innerText;
    const input = event.target;
    const textNode = input.childNodes[0];
    if (!textNode) {
      setInputValue("");
      return false;
    }

    // const selection = window.getSelection();
    // // const range = selection.getRangeAt(0);
    // const range = document.createRange();
    // range.setStart(textNode, 0);
    // const maxEnd = Math.min(text.length, maxLength);
    // range.setEnd(textNode, maxEnd);
    // console.log(range.endOffset);
    // console.log(range, range.endContainer);

    // input.textContent = range;

    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    const caretPosition = Math.min(range.endOffset, maxLength);

    const text = value;

    // const text = cutTailText(value);
    // input.textContent = text;
    // selection.setPosition(input.childNodes[0], caretPosition);

    // selection.collapse(input, 1);
    // selection.collapse(textNode, 1);
    // selection.setPosition(textNode, 1);

    // const newRange = document.createRange();
    // newRange.setStart(textNode, text.length);
    // newRange.collapse(textNode, text.length);
    // selection.removeAllRanges();
    // selection.addRange(newRange);
    setInputValue(text);
    if (callback !== undefined) callback(value);
  }

  return (
    <InputContainer>
      <Input
        // onKeyDown={handleKeyDown}
        onKeyDown={handleInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        mobileFontSize={mobileFontSize}
      />
      <Placeholder
        isOn={isFocus || inputValue.length > 0}
        mobileFontSize={mobileFontSize}
      >
        {placeholder}
      </Placeholder>
      <Counter isOn={isFocus} mobileFontSize={mobileFontSize}>
        {maxLength - inputValue.length}
      </Counter>
    </InputContainer>
  );
}

FlexibleInput.defaultProps = {
  placeholder: "placeholder",
  mobileFontSize: "1.5rem",
  callback: undefined,
};

FlexibleInput.propTypes = {
  maxLength: PropTypes.number.isRequired,
  mobileFontSize: PropTypes.string,
  placeholder: PropTypes.string,
  callback: PropTypes.func,
};

export default FlexibleInput;
