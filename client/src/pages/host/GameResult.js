import React from 'react';
import styled from 'styled-components';

import Dashboard from '../../components/common/Dashboard';
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

function HostGameResult() {
  return (
    <Background>
      <Title>TOP 10</Title>
      <Dashboard />
    </Background>
  );
}

export default HostGameResult;
