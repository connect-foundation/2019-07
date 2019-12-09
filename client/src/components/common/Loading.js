import React from 'react';
import styled from 'styled-components';

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
  top: 90%;
  transform: translateY(-100%);
`;

function Loading() {
  return (
    <LoadingContainer>
      <LoadingCircle color="white" />
      <LoadingText>데이터를 불러오는 중입니다</LoadingText>
    </LoadingContainer>
  );
}

export default Loading;
