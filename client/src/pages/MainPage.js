import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Background from '../components/mainPage/Background';
import Logo from '../components/logo/Logo';
import ContentSection from '../components/common/ContentSection';
import MainContainer from '../components/common/MainContainer';
import CopyrightFooter from '../components/common/CopyrightFooter';
import EnterRoomNumber from './mainPage/EnterRoomNumber';
import EnterNickname from './mainPage/EnterNickname';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

function Main() {
  return (
    <Wrapper>
      <Background>
        <ContentSection>
          <MainContainer>
            <Logo />
            <Switch>
              <Route exact path="/" component={EnterRoomNumber} />
              <Route path="/nickname" component={EnterNickname} />
            </Switch>
          </MainContainer>
          <CopyrightFooter />
        </ContentSection>
      </Background>
    </Wrapper>
  );
}

export default Main;
