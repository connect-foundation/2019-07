import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dashboard from '../common/Dashboard';
import * as colors from '../../constants/colors';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  user-select: none;
`;

const Title = styled.span`
  position: relative;
  margin: 3vmin 0;
  font-size: 10vmin;
  font-weight: bold;
`;

function HostGameResult({ ranking }) {
  return (
    <Background>
      <Title>TOP 10</Title>
      <Dashboard ranking={ranking} />
    </Background>
  );
}

HostGameResult.defaultProps = {
  ranking: [],
};

HostGameResult.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object),
};

export default HostGameResult;
