import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

function HostFooter({ roomNumber }) {
  return (
    <Footer>
      <ServiceDomain>{DOMAIN}</ServiceDomain>
      <RoomCode>#{roomNumber}</RoomCode>
    </Footer>
  );
}

HostFooter.propTypes = {
  roomNumber: PropTypes.string.isRequired,
};

export default HostFooter;
