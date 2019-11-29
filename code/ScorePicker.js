import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as colors from "../../constants/colors";
import transparencyImage from "../../assets/images/transparency.png";

// styled-components...

function ScorePicker({ score, setScore }) {
  const [startX, setStartX] = useState(0);
  const [startTranslateX, setStartTranslateX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

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

  function synchronizeTranslateX() {
    if (score === 0 && !(translateX >= -60 && translateX < -30)) {
      setTranslateX(-60);
    }
    if (score === 1000 && !(translateX >= -30 && translateX < 30)) {
      setTranslateX(0);
    }
    if (score === 2000 && !(translateX >= 30 && translateX <= 60)) {
      setTranslateX(60);
    }
  }

  useEffect(() => {
    synchronizeTranslateX();
  }, [score]);

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
          e.dataTransfer.setDragImage(dragImage, 0, 0);
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

ScorePicker.propTypes = {
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired
};

export default ScorePicker;
