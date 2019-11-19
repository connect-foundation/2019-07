import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../components/logo/Logo';
import CopyrightFooter from '../components/common/CopyrightFooter';
import EnterRoomNumber from '../components/mainPage/EnterRoomNumber';
import EnterNickname from '../components/mainPage/EnterNickname';
import { PRIMARY_LIGHT_YELLOW } from '../constants/colors';

const Background = styled.div`
  position: relative;
  display: flex;
  height: 100%;
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
    @media (min-width: 700px) {
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
    width: 20rem;
    height: 5rem;
  }
`;

function MainPage() {
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
              <Route path="/nickname" component={EnterNickname} />
            </Switch>
          </RoutingContainer>
        </MainContainer>
        <CopyrightFooter />
      </ContentSection>
    </Background>
  );
}

export default MainPage;
