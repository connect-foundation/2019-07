import React from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import * as styles from '../../styles/common';

function PlayerFooter() {
  return (
    <Footer>
      <Nickname />
      <Score />
    </Footer>
  );
}

const Nickname = styled.span`
  ${styles.InGameFooterTextStyle}
  margin-left: 0.5rem;
  color: ${colors.TEXT_BLACK};
`;

const Score = styled.span`
  ${styles.InGameFooterTextStyle}
  right: 0.5rem;
  color: ${colors.TEXT_WHITE};
  background-color: ${colors.TEXT_BLACK};
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
`;

const Footer = styled.footer`
  ${styles.InGameFooterStyle}
`;

export default PlayerFooter;
