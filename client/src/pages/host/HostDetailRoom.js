import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import TabContents from '../../components/detailRoom/TabContents';
import RoomInformation from '../../components/detailRoom/RoomInformation';

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
  function handlePlayButton() {
    history.push({
      pathname: '/host',
      state: {
        roomId: location.state.roomId,
      },
    });
  }

  return (
    <Background>
      <Header>
        <RoomInformation roomId={location.state.roomId} />
        <ButtonContainer>
          <YellowButton onClick={handlePlayButton}>시작하기</YellowButton>
        </ButtonContainer>
      </Header>
      <TabContents roomId={location.state.roomId} history={history} />
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
