import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoadingCircle from './LoadingCircle';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  &::before {
    position: absolute;
    content: '';
    background-color: black;
    opacity: 0.7;
    width: 100%;
    height: 100%;
  }
`;

const LoadingText = styled.span`
  position: absolute;
  color: white;
  font-weight: bold;
  font-size: 4vmin;
  width: 100%;
  text-align: center;
  top: 80%;
  transform: translateY(-100%);
  user-select: none;
`;

function Loading({ message }) {
  return (
    <LoadingContainer>
      <LoadingCircle color="white" />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
}
Loading.defaultProps = {
  message: '로딩 중입니다',
};
Loading.propTypes = {
  message: PropTypes.string,
};
export default Loading;
