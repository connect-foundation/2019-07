import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import QuizTab from '../../components/detailRoom/QuizTab';

const Background = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
`;

function DetailRoom() {
  const history = useHistory();
  const location = useLocation();

  if (!location.state) {
    window.location.href = '/host/room/select';
  }

  const [quizsetId, setQuizsetId] = useState(undefined);
  const { roomId } = location.state;

  function handlePlayButton() {
    history.push({
      pathname: '/host',
      state: {
        roomId,
      },
    });
  }

  return (
    <Background>
      <Header
        button={
          quizsetId && (
            <YellowButton onClick={handlePlayButton}>시작하기</YellowButton>
          )
        }
      />
      <QuizTab roomId={roomId} setId={setQuizsetId} />
    </Background>
  );
}

export default DetailRoom;
