import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const translates = [-6, 0, 6];

const ScorePickerWrapper = styled.div`
  z-index: 4;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15rem;
  width: 20rem;
  height: 10rem;
  border: 1px solid black;
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  font-size: 1.5rem;
`;

const Bar = styled.div`
  position: absolute;
  width: 12rem;
  height: 0.2rem;
  background: ${colors.BORDER_DARK_GRAY};
  cursor: pointer;
`;

const Circle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${props => props.x}rem);
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${colors.BORDER_DARK_GRAY};
`;

const InnerCircle = styled.div`
  position: absolute;
  transform: translateX(${props => props.x}rem);
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${colors.BORDER_DARK_GRAY};
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    transform: scale(2);
  }
  transition: 0.2s;
`;

const SlideButton = styled.button`
  z-index: 5rem;
  position: absolute;
  width: 6rem;
  height: 3rem;
  outline: none;
  border: none;
  border-radius: 5rem;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 2px 0px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: ${colors.TEXT_BLACK};
  transform: translateX(${props => props.translateX}px);
`;

function ScorePicker() {
  const [startX, setStartX] = useState(0);
  const [startTranslateX, setStartTranslateX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [score, setScore] = useState(1000);

  function handleScoreChange() {
    if (translateX >= -60 && translateX < -30) {
      setScore(0);
    }
    if (translateX >= -30 && translateX < 30) {
      setScore(1000);
    }
    if (translateX >= 30 && translateX <= 60) {
      setScore(2000);
    }
  }

  useEffect(() => {
    handleScoreChange();
  }, [translateX]);

  return (
    <ScorePickerWrapper>
      <Title>점수</Title>
      <Bar />
      {translates.map((translate, index) => (
        <Circle key={translate} x={translate}>
          <InnerCircle
            onClick={() => {
              setTranslateX(translates[index] * 10);
            }}
          />
        </Circle>
      ))}
      <SlideButton
        translateX={translateX}
        draggable
        onDragStart={e => {
          e.dataTransfer.setDragImage(new Image(), 0, 0);
          setStartX(e.clientX);
          setStartTranslateX(translateX);
        }}
        onDrag={e => {
          const posX = e.clientX;
          const displacement = posX - startX;
          const nextTranslateX = startTranslateX + displacement;
          if (nextTranslateX < -60 || nextTranslateX > 60) return;
          setTranslateX(nextTranslateX);
        }}
        onDragEnd={() => {
          if (translateX >= -60 && translateX < -30) {
            setTranslateX(-60);
          } else if (translateX >= -30 && translateX < 30) {
            setTranslateX(0);
          } else if (translateX >= 30 && translateX <= 60) {
            setTranslateX(60);
          }
        }}
      >
        {score}
      </SlideButton>
    </ScorePickerWrapper>
  );
}

export default ScorePicker;
