import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import QuizTab from '../../components/detailRoom/QuizTab';
import RoomInformation from '../../components/detailRoom/RoomInformation';
import { readQuizsetId } from '../../utils/fetch';

const Background = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

function DetailRoom({ history, location }) {
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

  useEffect(() => {
    async function getQuizsetId() {
      const { data } = await readQuizsetId(roomId);
      setQuizsetId(data.quizsetId);
    }
    getQuizsetId();
  }, []);

  return (
    <Background>
      <Header>
        <RoomInformation roomId={roomId} />
        <ButtonContainer>
          {quizsetId && (
            <YellowButton onClick={handlePlayButton}>시작하기</YellowButton>
          )}
        </ButtonContainer>
      </Header>
      <QuizTab roomId={roomId} history={history} quizsetId={quizsetId} />
    </Background>
  );
}

DetailRoom.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

export default DetailRoom;
