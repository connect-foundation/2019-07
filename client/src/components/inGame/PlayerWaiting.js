import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import LoadingCircle from '../common/LoadingCircle';

import { fetchQuizSet } from '../../utils/fetch';

const LoadingText = styled.span`
  font-size: 1.5rem;
  margin-top: 5rem;
  color: ${colors.PRIMARY_DEEP_GREEN};
  font-weight: bold;
  margin-top: auto;
  justify-self: flex-end;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 2rem;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex: 1;
  padding: 3rem;
  align-items: center;
`;

function PlayerWaiting({ setQuizSet, roomNumber }) {
  useEffect(() => {
    fetchQuizSet(roomNumber).then(response => {
      if (response.isSuccess) {
        setQuizSet(response.quizSet);
      } else {
        // 유효하지 않은 방의 퀴즈세트를 받는 경우
        window.location.href = '/';
      }
    });
  }, []);

  return (
    <Main>
      <LoadingCircle color={colors.PRIMARY_DEEP_GREEN} />
      <LoadingText>게임 시작을 기다리고 있습니다...</LoadingText>
    </Main>
  );
}

PlayerWaiting.propTypes = {
  setQuizSet: PropTypes.func.isRequired,
  roomNumber: PropTypes.string.isRequired,
};

export default PlayerWaiting;
