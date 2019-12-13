import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import QuizTab from './QuizTab';

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

function TabContents({ history, roomId, quizsetId }) {
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
        {isQuizMenuSelected && (
          <QuizTab history={history} roomId={roomId} quizsetId={quizsetId} />
        )}
        {isAnalysisMenuSelected && <>ver 1.0에서 제공되지 않는 기능입니다</>}
      </main>
    </>
  );
}

TabContents.defaultProps = {
  quizsetId: undefined,
};

TabContents.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  roomId: PropTypes.number.isRequired,
  quizsetId: PropTypes.number,
};

export default TabContents;
