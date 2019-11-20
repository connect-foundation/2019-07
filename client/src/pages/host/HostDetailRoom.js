import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import TabContents from '../../components/detailRoom/TabContents';
import RoomInformation from '../../components/detailRoom/RoomInformation';

const Background = styled.div`
  height: 100%;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

function DetailRoom({ history }) {
  function handlePlayButton() {
    /**
     * 퀴즈를 시작할 것인지 확인하는 Modal 출력
     */
    history.push({
      pathname: '/host',
    });
  }

  return (
    <Background>
      <Header>
        <RoomInformation />
        <ButtonContainer>
          <YellowButton onClick={handlePlayButton}>시작하기</YellowButton>
        </ButtonContainer>
      </Header>
      <TabContents />
    </Background>
  );
}

DetailRoom.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetailRoom;
