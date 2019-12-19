import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../components/logo/Logo';
import CopyrightFooter from '../components/common/CopyrightFooter';
import EnterRoomNumber from '../components/mainPage/EnterRoomNumber';
import EnterNickname from '../components/mainPage/EnterNickname';
import NaverLogin from '../components/mainPage/NaverLogin';
import { ToastContext } from '../components/common/ToastProvider';
import { PRIMARY_LIGHT_YELLOW } from '../constants/colors';
import DESKTOP_MIN_WIDTH from '../constants/media';

const Background = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: ${PRIMARY_LIGHT_YELLOW};
  overflow-x: hidden;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
  padding: 5rem 0;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  div#logo3d {
    transform: scale3d(0.4, 0.4, 0.4);
    @media (min-width: ${DESKTOP_MIN_WIDTH}) {
      transform: scale3d(1, 1, 1);
    }
  }
`;

const RoutingContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  button,
  input {
    width: 25rem;
    min-height: 5rem;
  }
`;

function MainPage() {
  const { ToastMessage } = useContext(ToastContext);
  return (
    <Background>
      <ContentSection>
        <MainContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <RoutingContainer>
            <Switch>
              <Route exact path="/" component={EnterRoomNumber} />
              <Route path="/join/:roomNumber" component={EnterNickname} />
              <Route path="/login" component={NaverLogin} />
            </Switch>
          </RoutingContainer>
        </MainContainer>
        <CopyrightFooter />
      </ContentSection>
      <ToastMessage />
    </Background>
  );
}

export default MainPage;
