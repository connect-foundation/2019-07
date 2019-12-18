import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import GoBackButton from './GoBackButton';

const HEADER_HEIGHT = '10vmin';

const HeaderArea = styled.div`
  position: relative;
  flex: none;
  width: 100%;
  height: ${HEADER_HEIGHT};
`;

const HeaderStyle = styled.header`
  position: fixed;
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  z-index: 900;
`;

const ServiceLogoImage = styled.img.attrs({
  src: '../../static-logo.png',
})`
  height: 60%;
  cursor: pointer;
  user-select: none;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 2vmin;
  button {
    padding: 1vmin 1.5vmin;
    font-size: 3.5vmin;
    transform: translateY(-0.4vmin);
  }
`;

function Header({ button }) {
  const history = useHistory();
  return (
    <HeaderArea>
      <HeaderStyle>
        <GoBackButton />
        <ServiceLogoImage onClick={() => history.push('/')} />
        <ButtonWrapper>{button}</ButtonWrapper>
      </HeaderStyle>
    </HeaderArea>
  );
}

Header.defaultProps = {
  button: '',
};

Header.propTypes = {
  button: PropTypes.node,
};

export default Header;
