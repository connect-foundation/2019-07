import React from 'react';
import { useHistory } from 'react-router';
import styled, { css, keyframes } from 'styled-components';

import * as colors from '../../constants/colors';

const CONTAINER_HEIGHT = '5vmin';
const CONTAINER_WIDTH = `calc(${CONTAINER_HEIGHT} * 1.5)`;
const ARROW_HEIGHT = `calc(${CONTAINER_HEIGHT} / 6)`;
const ANIMATION_DELAY = 0.25;
const progresses = [0, 1, 2, 3];

const Container = styled.div`
  position: absolute;
  left: 0;
  width: ${CONTAINER_WIDTH};
  height: ${CONTAINER_HEIGHT};
  padding: 0 2vmin;
`;

const ButtonArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ArrowWrapper = styled.div`
  position: absolute;
  transform: translate(${props => `${props.margin}, ${props.margin}`});
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ArrowStyle = css`
  position: absolute;
  display: flex;
  height: ${ARROW_HEIGHT};
  border-radius: 10000px;
  padding: 1px;
`;

const ArrowBody = styled.div`
  ${ArrowStyle};
  width: ${CONTAINER_WIDTH};
  height: ${ARROW_HEIGHT};
  background-color: ${props => props.color};
`;

const ArrowHead = styled.div`
  ${ArrowStyle};
  width: calc(${CONTAINER_HEIGHT} / 1.5);
  background-color: ${props => props.color};
  transform-origin: calc(0% + ${ARROW_HEIGHT} / 2) 50%;
  transform: rotateZ(${props => props.degree}deg);
`;

const ProgressAnimation = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const Progress = styled.div`
  position: relative;
  flex: 1;
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  margin: 0 1px;
  border-radius: 100000px;

  animation-name: ${ProgressAnimation};
  animation-duration: ${ANIMATION_DELAY * progresses.length}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: ${props => props.delay}s;
`;

function GoBackButton() {
  const history = useHistory();
  return (
    <Container>
      <ButtonArea onClick={() => history.goBack()}>
        <ArrowWrapper margin="0.6vmin">
          <ArrowHead degree={-45} color="black" />
          <ArrowHead degree={45} color="black" />
          <ArrowBody color="black" />
        </ArrowWrapper>
        <ArrowWrapper margin="0">
          <ArrowHead degree={-45} color="white" />
          <ArrowHead degree={45} color="white" />
          <ArrowBody color="white">
            {progresses.map(item => (
              <Progress key={item} delay={-ANIMATION_DELAY * item} />
            ))}
          </ArrowBody>
        </ArrowWrapper>
      </ButtonArea>
    </Container>
  );
}

export default GoBackButton;
