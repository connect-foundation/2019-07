import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const degrees = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.size};
  height: ${props => props.size};
`;

const CapsuleWrapper = styled.div`
  position: absolute;
  width: calc(${props => props.size} / 12);
  height: calc(${props => props.size} / 2);
  transform: rotateZ(${props => props.degree}deg);
  transform-origin: 50% 100%;
`;

const Animation = keyframes`
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
`;

const Capsule = styled.div`
  position: absolute;
  width: 100%;
  height: 40%;
  background-color: ${props => props.color};
  border-radius: 10000px;

  animation-name: ${Animation};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 1.2s;
  animation-delay: ${props => props.delay};
`;

function LoadingCircle({ size, color }) {
  return (
    <Container size={size}>
      {degrees.map((degree, index) => (
        <CapsuleWrapper key={degree} size={size} degree={degree}>
          <Capsule delay={`${-1.1 + index * 0.1}s`} color={color} />
        </CapsuleWrapper>
      ))}
    </Container>
  );
}

LoadingCircle.defaultProps = {
  size: '15vw',
  color: 'salmon',
};

LoadingCircle.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default LoadingCircle;

//https://loading.io/css/
