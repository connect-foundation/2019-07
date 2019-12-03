import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputStyle } from '../../styles/common';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import * as colors from '../../constants/colors';

const BACKSPACE = 8;
const COUNTER_RATE = 0.5;
const PLACEHOLDER_RATE = 0.75;
const A_KEY = 65;
const DIRECTION_KEY = [37, 38, 39, 40]; // 좌, 우, 상, 하 순서

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

const Warning = styled.div`
  background-color: #ffc6c6;
  color: red;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 1.5rem;
  }
`;

function FlexibleInput({ maxLength, mobileFontSize, placeholder, callback }) {
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setFocus] = useState(false);
  const warningRef = useRef(null);

  function handleKeyDown(event) {
    if (
      event.target.textContent.length >= maxLength &&
      event.keyCode !== BACKSPACE &&
      !event.ctrlKey &&
      !(event.ctrlKey && event.keyCode === A_KEY) &&
      !DIRECTION_KEY.includes(event.keyCode)
    ) {
      event.preventDefault();
    } else {
      warningRef.current.textContent = '';
    }
  }

  function handleInput(event) {
    let value = event.target.textContent;

    if (value.length >= maxLength) {
      value = value.substring(0, maxLength);
      if (inputValue.length === maxLength) value = inputValue;

      event.target.textContent = value;
      warningRef.current.textContent = `${maxLength}글자를 넘을 수 없습니다`;
    }

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
      <Warning ref={warningRef} />
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
