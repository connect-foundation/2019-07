import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import * as styles from '../../styles/common';

function PlayerFooter({ nickname }) {
  return (
    <Footer>
      <Nickname>{nickname}</Nickname>
      <Score>0</Score>
    </Footer>
  );
}

PlayerFooter.propTypes = {
  nickname: PropTypes.string.isRequired,
};

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
