import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const HeaderArea = styled.div.attrs({
  className: 'headerArea',
})`
  position: relative;
  box-shadow: 5px 5px 5px ${colors.BACKGROUND_DEEP_GRAY};
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const ServiceLogoImage = styled.img.attrs({
  src: '../../static-logo.png',
})`
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 16rem;
  }
  width: 10rem;
  cursor: pointer;
`;

function Header({ children }) {
  return (
    <HeaderArea>
      <Link to="/">
        <ServiceLogoImage />
      </Link>
      {children}
    </HeaderArea>
  );
}

Header.defaultProps = {
  children: '',
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
