import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputStyle } from '../../styles/common';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import * as colors from '../../constants/colors';

const BACKSPACE = 8;
const COUNTER_RATE = 0.5;
const PLACEHOLDER_RATE = 0.75;

const InputContainer = styled.div.attrs({
  className: 'inputContainer',
})`
  position: relative;
  width: 100%;
  margin: auto;
`;

const Input = styled.div.attrs({
  contentEditable: true,
  className: 'inputTitle',
})`
  ${InputStyle};
  position: relative;
  display: inline-block;
  align-self: center;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  box-sizing: border-box;
  outline: none;
  padding: 0.5rem 1.5rem;
  font-size: ${props => props.mobileFontSize};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: calc(${props => props.mobileFontSize} * 2);
    padding: 1rem 3rem;
  }
`;

const Counter = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  opacity: ${props => (props.isOn ? 1 : 0)};
  transition-duration: 0.3s;
  font-size: calc(${props => props.mobileFontSize} * ${COUNTER_RATE});

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: calc(${props => props.mobileFontSize} * ${COUNTER_RATE} * 2);
  }
`;

const Placeholder = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: calc(${props => props.mobileFontSize} * ${PLACEHOLDER_RATE});
  font-weight: bold;
  color: ${colors.TEXT_GRAY};
  user-select: none;
  pointer-events: none;
  opacity: ${props => (props.isOn ? 0 : 1)};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: calc(${props => props.mobileFontSize} * ${PLACEHOLDER_RATE} * 2);
  }
`;

function FlexibleInput({ maxLength, mobileFontSize, placeholder, callback }) {
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setFocus] = useState(false);

  // useEffect(() => {
  //   setInputValue(title);
  //   document.querySelector('.inputTitle').innerText = title;
  // }, [title]);

  function handleKeyDown(event) {
    if (
      event.target.innerText.length >= maxLength &&
      event.keyCode !== BACKSPACE
    )
      event.preventDefault();
  }

  function handleInput(event) {
    const value = event.target.innerText;
    setInputValue(value);
    if (callback !== undefined) callback(value);
  }

  return (
    <InputContainer>
      <Input
        onKeyDown={handleKeyDown}
        onInput={handleInput}
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
  placeholder: 'placeholder',
  mobileFontSize: '1.5rem',
  callback: undefined,
};

FlexibleInput.propTypes = {
  maxLength: PropTypes.number.isRequired,
  mobileFontSize: PropTypes.string,
  placeholder: PropTypes.string,
  callback: PropTypes.func,
};

export default FlexibleInput;
