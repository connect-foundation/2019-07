import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import { Button } from '../../components/common/Buttons';
import PlayerFooter from '../../components/inGame/PlayerFooter';
import PlayerHeader from '../../components/inGame/PlayerHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex: 1;
  padding: 3rem;
  align-items: center;
`;

const ItemCardsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 1rem 0;
`;

const ButtonDefault = css`
  position: relative;
  padding: 0.5rem;
  border: none;
  outline: none;
  button {
    height: 6rem;
    color: #ffffff;
    font-size: 2rem;
  }
  @media (min-width: 1000px) {
    button {
      height: 10rem;
    }
    font-size: 3rem;
  }
`;

function HalfButton({ children, backgroundColor }) {
  const HalfSizeButton = styled.div`
    ${ButtonDefault}
    width: calc(50% - 1rem);
  `;
  return (
    <HalfSizeButton>
      <Button backgroundColor={backgroundColor}>{children}</Button>
    </HalfSizeButton>
  );
}

function FullButton({ children, backgroundColor }) {
  const FullSizeButton = styled.div`
    ${ButtonDefault}
    width: 100%;
  `;
  return (
    <FullSizeButton>
      <Button backgroundColor={backgroundColor}>{children}</Button>
    </FullSizeButton>
  );
}

function PlayerWaitingRoom() {
  return (
    <Container>
      <PlayerHeader title="오늘 저녁은 뭘 먹을까요?" />
      <Main />
      <ItemCardsPanel>
        <HalfButton backgroundColor="red">1번</HalfButton>
        <HalfButton backgroundColor="blue">2번</HalfButton>
        <HalfButton backgroundColor="green">3번</HalfButton>
        <HalfButton backgroundColor="orange">4번</HalfButton>
        <FullButton backgroundColor="salmon">5번</FullButton>
      </ItemCardsPanel>
      {/* <PlayerFooter nickname={location.state.nickname} /> */}
      <PlayerFooter />
    </Container>
  );
}

PlayerWaitingRoom.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      roomNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

FullButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

HalfButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default PlayerWaitingRoom;
