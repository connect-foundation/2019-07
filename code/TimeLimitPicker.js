import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as colors from "../../constants/colors";

const circles = [5, 10, 20, 30, 60, 90, 120, 240];
const degs = [270, 315, 0, 45, 90, 135, 180, 225];
const delays = [0.05, 0.075, 0.1, 0.125, 0.15, 0.175, 0.2, 0.225];

// styled-components...

function TimeLimitPicker({ timeLimit, setTimeLimit }) {
  const [isClicked, setClicked] = useState(false);

  function handleCenterClick() {
    setClicked(!isClicked);
  }

  return (
    <TimeLimitPickerWrapper>
      <CenterCircle onClick={handleCenterClick}>{timeLimit} sec</CenterCircle>
      {circles.map((circle, index) => (
        <CircleWrapper key={circles[index]} deg={degs[index]}>
          <Circle
            deg={degs[index]}
            isClicked={isClicked}
            delay={delays[index]}
            onClick={() => {
              setTimeLimit(circles[index]);
              setClicked(!isClicked);
            }}
          >
            {circle}
          </Circle>
        </CircleWrapper>
      ))}
    </TimeLimitPickerWrapper>
  );
}

TimeLimitPicker.propTypes = {
  timeLimit: PropTypes.number.isRequired,
  setTimeLimit: PropTypes.func.isRequired
};

export default TimeLimitPicker;
