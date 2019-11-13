import React from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import { ButtonStyle } from '../../styles/common';
import Header from '../../components/common/Header';
import Footer from '../../components/inGame/HostFooter';

function WatingRoom() {
  return (
    <Container>
      <Header>
        <StartButton>Start</StartButton>
      </Header>
      <Main>
        <PlayerCounter>대기자</PlayerCounter>
        <PlayerList />
      </Main>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const StartButton = styled.button`
  ${ButtonStyle}
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 4rem;
  width: 7rem;
`;

const Main = styled.main`
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex: 1;
  padding: 3rem;
`;

const PlayerCounter = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.TEXT_BLACK};
`;

const PlayerList = styled.ul`
  background-color: white;
  li {
    display: inline-block;
    margin: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.TEXT_BLACK};
  }
`;

export default WatingRoom;
