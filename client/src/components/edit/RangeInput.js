import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';

const THUMB_WIDTH = '8vmin';
const DOT_SIZE = '6px';

const Container = styled.div`
  position: relative;
  width: 95%;
  height: calc(${THUMB_WIDTH} / 2);
`;

const ThumbStyle = css`
  width: ${THUMB_WIDTH};
  height: calc(${THUMB_WIDTH} / 2);
  border-radius: 20px;
  border: none;
  top: 50%;
  transform: translateY(-50%);
`;

const Thumb = styled.div`
  ${ThumbStyle}
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 1px 1px black;
  left: ${props => props.left};
  transform: translate(-${props => props.left}, -50%);
  pointer-events: none;
  user-select: none;

  &::before {
    content: '${props => props.value}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: calc(${THUMB_WIDTH} / 3);
  }
`;

const InputStyle = styled.input.attrs({
  type: 'range',
  min: 0,
})`
  -webkit-appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  outline: none;

  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  ::-webkit-slider-thumb {
    ${ThumbStyle}
    -webkit-appearance: none;
    position: relative;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

const ContentArea = styled.div`
  position: absolute;
  pointer-events: none;
  width: calc(100% - ${THUMB_WIDTH});
  background-color: transparent;
  height: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
`;

const Track = styled.div`
  position: absolute;
  background-color: ${colors.TEXT_BLACK};
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
`;

const Dot = styled.div`
  position: absolute;
  background-color: ${colors.TEXT_BLACK};
  width: ${DOT_SIZE};
  height: ${DOT_SIZE};
  border-radius: 50%;
  top: 50%;
  left: ${props => props.left};
  transform: translate(-50%, -50%) scale(1);
`;

function RangeInput({ params, onChange, dependency }) {
  const inputRef = useRef();
  const lastIndex = params.length - 1;
  const defaultValue = parseInt(lastIndex / 2, 10);
  const [currentIndex, setCurrentIndex] = useState(defaultValue);
  const getLeft = index => {
    return `${(index / lastIndex) * 100}%`;
  };
  const getValue = index => {
    return params[index];
  };
  const thumbLeft = getLeft(currentIndex);

  function handleChange(event) {
    const index = event.target.value;
    setCurrentIndex(index);
    if (onChange) onChange(getValue(index));
  }

  useEffect(() => {
    if (!dependency) return;
    setCurrentIndex(dependency);
  }, [dependency]);

  return (
    <Container>
      <ContentArea>
        <Track>
          {params.map((param, index) => (
            <Dot key={param} left={getLeft(index)} />
          ))}
        </Track>
      </ContentArea>
      <InputStyle
        ref={inputRef}
        max={lastIndex}
        defaultValue={defaultValue}
        onChange={event => handleChange(event)}
      />
      <Thumb left={thumbLeft} value={getValue(currentIndex)} />
    </Container>
  );
}

RangeInput.defaultProps = {
  onChange: undefined,
  dependency: undefined,
};

RangeInput.propTypes = {
  params: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func,
  dependency: PropTypes.number,
};

export default RangeInput;
