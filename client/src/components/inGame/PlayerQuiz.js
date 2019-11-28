import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import PlayerHeader from './PlayerHeader';
import { Button } from '../common/Buttons';

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
    height: 8rem;
    color: #ffffff;
    font-size: 2rem;
  }
  @media (min-width: 1000px) {
    button {
      height: 12rem;
    }
    font-size: 3rem;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex: 1;
  padding: 3rem;
  align-items: center;
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

function Quiz() {
  return (
    <>
      <PlayerHeader title="오늘 저녁은 뭘 먹을까요?" />
      <Main />
      <ItemCardsPanel>
        <HalfButton backgroundColor={colors.ITEM_COLOR[0]}>1번</HalfButton>
        <HalfButton backgroundColor={colors.ITEM_COLOR[1]}>2번</HalfButton>
        <HalfButton backgroundColor={colors.ITEM_COLOR[2]}>3번</HalfButton>
        <HalfButton backgroundColor={colors.ITEM_COLOR[3]}>4번</HalfButton>
      </ItemCardsPanel>
    </>
  );
}

FullButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

HalfButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default Quiz;
