import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const HeaderStyle = styled.header`
  position: relative;
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  box-shadow: 5px 5px 5px ${colors.BACKGROUND_DEEP_GRAY};
  height: 6rem;
`;

const ServiceLogoImage = styled.img.attrs({
  src: '../../static-logo.png',
})`
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 16rem;
  }
  position: absolute;
  left: 50%;
  width: 10rem;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
`;

function Header({ children }) {
  return (
    <HeaderStyle>
      <ServiceLogoImage />
      {children}
    </HeaderStyle>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
