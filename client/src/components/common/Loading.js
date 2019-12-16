import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LoadingCircle from './LoadingCircle';
import DESKTOP_MIN_WIDTH from '../../constants/media';

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
`;

const BigRoomNumber = styled.div`
  position: absolute;
  top: 10%;
  font-size: 3rem;
  color: #fff;
  width: 100%;
  z-index: 10000;
  font-weight: bold;
  transform: translateY(-50%);
  text-align: center;
  background-color: #333;
  padding: 2rem 0;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 5rem;
  }
`;

function Loading({ roomNumber }) {
  return (
    <LoadingContainer>
      <BigRoomNumber>방 번호 : {roomNumber}</BigRoomNumber>
      <LoadingCircle color="white" />
      <LoadingText>참가자를 기다리고 있습니다...</LoadingText>
    </LoadingContainer>
  );
}

Loading.propTypes = {
  roomNumber: PropTypes.string.isRequired,
};

export default Loading;
