import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const circles = [5, 10, 20, 30, 60, 90, 120, 240];
const degs = [270, 315, 0, 45, 90, 135, 180, 225];
const delays = [0.05, 0.075, 0.1, 0.125, 0.15, 0.175, 0.2, 0.225];

const TimeLimitPickerWrapper = styled.div`
  z-index: 5;
  position: absolute;
  display: flex;
  width: 20rem;
  height: 15rem;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const CenterCircle = styled.button`
  z-index: 6;
  position: absolute;
  width: 6rem;
  height: 6rem;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 2px 0px;
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.TEXT_BLACK};
`;

const CircleWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.5rem;
  transform: rotate(${props => props.deg}deg);
`;

const Circle = styled.button`
  z-index: 7;
  position: relative;
  left: ${props => (props.isClicked ? '7rem' : 0)};
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transform: rotate(${props => -props.deg}deg);
  box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 2px 0px;
  transition: left 0.1s;
  transition-delay: ${props => props.delay}s;
  transition-timing-function: linear;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.TEXT_BLACK};
  &:hover {
    color: red;
  }
`;

function TimeLimitPicker() {
  const [isClicked, setClicked] = useState(false);

  function handleCenterClick() {
    setClicked(!isClicked);
  }

  return (
    <TimeLimitPickerWrapper>
      <CenterCircle onClick={handleCenterClick}>30 sec</CenterCircle>
      {circles.map((circle, index) => (
        <CircleWrapper key={index} deg={degs[index]}>
          <Circle deg={degs[index]} isClicked={isClicked} delay={delays[index]}>
            {circle}
          </Circle>
        </CircleWrapper>
      ))}
    </TimeLimitPickerWrapper>
  );
}

export default TimeLimitPicker;
