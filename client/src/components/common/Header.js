import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const HeaderHeight = '8vmin';

const HeaderArea = styled.div.attrs({
  className: 'headerArea',
})`
  position: relative;
  width: 100%;
  height: ${HeaderHeight};
  flex: none;
`;

const HeaderStyle = styled.header`
  position: fixed;
  width: 100%;
  height: ${HeaderHeight};
  box-shadow: 5px 5px 5px ${colors.BACKGROUND_DEEP_GRAY};
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  z-index: 900;
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
  cursor: pointer;
`;

function Header({ children }) {
  return (
    <HeaderArea>
      <HeaderStyle>
        <Link to="/">
          <ServiceLogoImage />
        </Link>
        {children}
      </HeaderStyle>
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
