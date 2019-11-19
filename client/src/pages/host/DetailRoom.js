import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';

const Background = styled.div`
  height: 100%;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
`;

const RoomInfoWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  span {
    color: ${colors.TEXT_WHITE};
    font-weight: bold;
    font-size: 2rem;
    text-shadow: 1px 1px 3px ${colors.TEXT_BLACK};
    margin-left: 1rem;
  }
`;

const EditRoomNameImage = styled.img.attrs({
  src:
    'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-edit-4.png&r=255&g=255&b=255',
})`
  width: 2.5rem;
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    text-decoration: underline;
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

const NavigationBar = styled.nav`
  display: flex;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  height: 5rem;
  box-shadow: 0 5px 5px -4px ${colors.TEXT_GRAY};
  justify-content: center;
  align-items: center;
`;

const TabMenuButton = styled.div`
  border-bottom: ${props =>
    props.isSelected ? `3px solid ${colors.TEXT_BLACK}` : `none`};
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.TEXT_BLACK};
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid ${colors.TEXT_BLACK};
  }
  &:focus {
    outline: none;
  }
`;

function DetailRoom({ history }) {
  const [roomName, setRoomName] = useState('방 이름');
  const [isQuizMenuSelected, setQuizMenuState] = useState(true);
  const [isAnalysisMenuSelected, setAnalysisMenuState] = useState(false);

  function handleRoomName() {
    /**
     * 현재 방의 이름을 Modal input에 출력
     * 유저가 입력한 값을 setRoomName로 설정하고 fetch
     * 응답이 실패로 왔을 경우 상태를 이전으로 돌리고 유저에게 알림
     * */
    const currentRoomName = roomName;
    setRoomName(currentRoomName);
  }

  function handlePlayButton() {
    /**
     * 퀴즈를 시작할 것인지 확인하는 Modal 출력
     */
    history.push({
      pathname: '/host',
    });
  }

  function resetMenuState() {
    setQuizMenuState(false);
    setAnalysisMenuState(false);
  }

  function handleQuizMenuClick() {
    resetMenuState();
    setQuizMenuState(true);
  }

  function handleAnalysisMenuClick() {
    resetMenuState();
    setAnalysisMenuState(true);
  }

  return (
    <Background>
      <Header>
        <RoomInfoWrapper>
          <span>{roomName}</span>
          <EditRoomNameImage title="이름 수정하기" onClick={handleRoomName} />
        </RoomInfoWrapper>
        <ButtonContainer>
          <YellowButton onClick={handlePlayButton}>시작하기</YellowButton>
        </ButtonContainer>
      </Header>
      <NavigationBar>
        <TabMenuButton
          type="button"
          onClick={handleQuizMenuClick}
          isSelected={isQuizMenuSelected}
        >
          퀴즈
        </TabMenuButton>
        <TabMenuButton
          type="button"
          onClick={handleAnalysisMenuClick}
          isSelected={isAnalysisMenuSelected}
        >
          분석
        </TabMenuButton>
      </NavigationBar>
      <main>
        {isQuizMenuSelected && <>퀴즈 컴포넌트</>}
        {isAnalysisMenuSelected && <>분석 컴포넌트</>}
      </main>
    </Background>
  );
}

DetailRoom.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetailRoom;
