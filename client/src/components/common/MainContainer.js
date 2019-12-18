import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  padding: 4vmin 4vmin 2vmin 4vmin;
`;

function MainContainer({ children }) {
  return <Main>{children}</Main>;
}

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
