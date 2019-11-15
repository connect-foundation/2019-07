import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const HeaderStyle = styled.header`
  position: relative;
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  box-shadow: 5px 5px 5px ${colors.BACKGROUND_DEEP_GRAY};
  height: 6rem;
`;

function Header({ children }) {
  return <HeaderStyle>{children}</HeaderStyle>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
