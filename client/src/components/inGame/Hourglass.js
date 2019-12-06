import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const GLASS_COLOR = '#b2eef9';
const GLASS_SIZE = '5vw';
const SAND_COLOR = '#ffd858';
const ANIMATION_DURATION = '5s';
const BORDER_COLOR = 'black';
const ROTATE_PERCENT = 97;
const FALL_START_PERCENT = 10;

const RotateGlassAnimation = keyframes`
  ${ROTATE_PERCENT}% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(180deg);
  }
`;

const HourglassContainer = styled.div.attrs({
  className: 'hourglass',
})`
  animation-name: ${RotateGlassAnimation};
  animation-duration: ${ANIMATION_DURATION};
  animation-iteration-count: infinite;
`;

function getTriangleStyle(isTop, color) {
  const Style = css`
    position: absolute;
    width: 0;
    height: 0;
    border-left: calc(${GLASS_SIZE} / 2) solid transparent;
    border-right: calc(${GLASS_SIZE} / 2) solid transparent;
    ${isTop
      ? `border-top: calc(${GLASS_SIZE} / 2) solid ${color};`
      : `border-bottom: calc(${GLASS_SIZE} / 2) solid ${color};`}
  `;
  return Style;
}

const Top = styled.div`
  position: relative;
  width: ${GLASS_SIZE};
  height: ${GLASS_SIZE};
  border-top: calc(${GLASS_SIZE} / 10) solid ${BORDER_COLOR};
`;

const Bottom = styled.div`
  position: relative;
  width: ${GLASS_SIZE};
  height: ${GLASS_SIZE};
  border-bottom: calc(${GLASS_SIZE} / 10) solid ${BORDER_COLOR};
`;

const TopGlass = styled.div`
  position: absolute;
  width: ${GLASS_SIZE};
  height: calc(${GLASS_SIZE} / 2);
  background-color: ${GLASS_COLOR};
  transform: scale(1);

  &::before {
    content: '';
    ${getTriangleStyle(true, GLASS_COLOR)};
    bottom: calc(-${GLASS_SIZE} / 2);
  }
`;

const BottomGlass = styled.div`
  position: absolute;
  width: ${GLASS_SIZE};
  height: calc(${GLASS_SIZE} / 2);
  background-color: ${GLASS_COLOR};
  bottom: 0;

  &::before {
    content: '';
    ${getTriangleStyle(false, GLASS_COLOR)};
    top: calc(-${GLASS_SIZE} / 2);
  }
`;

const ClearSandAnimation = keyframes`
  0%{
    transform: scale(1);
  }
  ${FALL_START_PERCENT}%{
    transform: scale(1);
  }
  ${ROTATE_PERCENT - 5}%{
    transform: scale(0);
  }
  100%{
    transform: scale(0);
  }
`;

const FillSandAnimation = keyframes`
  0%{
    transform: scale(0);
    bottom: 0;
  }
  ${FALL_START_PERCENT}%{
    transform: scale(0);
    bottom: 0;
  }
  ${ROTATE_PERCENT - 5}%{
    transform: scale(1);
    bottom: 0;
  }
  ${ROTATE_PERCENT}%{
    transform: scale(1);
    bottom: 0;
  }
  100%{
    transform: scale(1);
    bottom: calc(${GLASS_SIZE} / 2);
  }
`;

const TopSand = styled.div`
  ${getTriangleStyle(true, SAND_COLOR)}
  top: calc(${GLASS_SIZE} / 2);
  transform-origin: 50% 100%;

  animation-name: ${ClearSandAnimation};
  animation-duration: ${ANIMATION_DURATION};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const BottomSand = styled.div`
  ${getTriangleStyle(false, SAND_COLOR)}
  transform: scale(0);
  transform-origin: 50% 100%;

  animation-name: ${FillSandAnimation};
  animation-duration: ${ANIMATION_DURATION};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const FallSandAnimation = keyframes`
  0%{
    opacity: 0;
    height: ${GLASS_SIZE};
  }
  ${FALL_START_PERCENT}%{
    opacity: 0;
    height: ${GLASS_SIZE};
  }
  ${ROTATE_PERCENT - 10}%{
    opacity: 1;
    height: ${GLASS_SIZE};
    top: 0;
  }
  ${ROTATE_PERCENT - 8}%{
    opacity: 1;
    height: 0;
    top: calc(${GLASS_SIZE} / 2);
  }
  100%{
    opacity: 0;
    height: 0;
  }
`;

const FallSand = styled.div`
  position: absolute;
  border-left: 3px solid ${SAND_COLOR};
  height: ${GLASS_SIZE};
  left: calc(50% - 1px);

  animation-name: ${FallSandAnimation};
  animation-duration: ${ANIMATION_DURATION};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

function Hourglass() {
  return (
    <HourglassContainer>
      <Top>
        <TopGlass>
          <TopSand />
        </TopGlass>
      </Top>
      <Bottom>
        <BottomGlass>
          <BottomSand />
        </BottomGlass>
        <FallSand />
      </Bottom>
    </HourglassContainer>
  );
}

export default Hourglass;

//http://riophae.github.io/css-animated-hourglass/demo.html
//https://codepen.io/MarvinVK/pen/MpPMwB
//https://codepen.io/nckg/pen/ojGdK
