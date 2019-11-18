import React from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import * as styles from '../../styles/common';
import DOMAIN from '../../constants/domain';

const ServiceDomain = styled.span`
  ${styles.InGameFooterTextStyle}
  margin-left: 0.5rem;
  color: ${colors.TEXT_BLACK};
`;

const RoomCode = styled.span`
  ${styles.InGameFooterTextStyle}
  right: 0.5rem;
  color: ${colors.TEXT_GRAY};
`;

const Footer = styled.footer`
  ${styles.InGameFooterStyle}
`;

function HostFooter() {
  return (
    <Footer>
      <ServiceDomain>{DOMAIN}</ServiceDomain>
      <RoomCode />
    </Footer>
  );
}

export default HostFooter;
