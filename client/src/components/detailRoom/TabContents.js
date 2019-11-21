import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';

const NavigationBar = styled.nav`
  display: flex;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  height: 5rem;
  box-shadow: 0 5px 5px -4px ${colors.TEXT_GRAY};
  justify-content: center;
  align-items: center;
`;

const TabMenuButton = styled.div`
  border-bottom: ${props =>
    props.isSelected ? `3px solid ${colors.TEXT_BLACK}` : `none`};
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.TEXT_BLACK};
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid ${colors.TEXT_BLACK};
  }
  &:focus {
    outline: none;
  }
`;

function TabContents() {
  const [isQuizMenuSelected, setQuizMenuState] = useState(true);
  const [isAnalysisMenuSelected, setAnalysisMenuState] = useState(false);

  function resetMenuState() {
    setQuizMenuState(false);
    setAnalysisMenuState(false);
  }

  function handleQuizMenuClick() {
    resetMenuState();
    setQuizMenuState(true);
  }

  function handleAnalysisMenuClick() {
    resetMenuState();
    setAnalysisMenuState(true);
  }

  return (
    <>
      <NavigationBar>
        <TabMenuButton
          type="button"
          onClick={handleQuizMenuClick}
          isSelected={isQuizMenuSelected}
        >
          퀴즈
        </TabMenuButton>
        <TabMenuButton
          type="button"
          onClick={handleAnalysisMenuClick}
          isSelected={isAnalysisMenuSelected}
        >
          분석
        </TabMenuButton>
      </NavigationBar>
      <main>
        {isQuizMenuSelected && <>퀴즈 컴포넌트</>}
        {isAnalysisMenuSelected && <>분석 컴포넌트</>}
      </main>
    </>
  );
}

export default TabContents;
