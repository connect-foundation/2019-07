import React, { useContext, useState, useEffect } from 'react';
import { GreenButton } from '../common/Buttons';
import ScoreChart from '../common/ScoreChart';
import * as layout from './Layout';
import { HostGameAction, HostGameContext } from '../../reducer/hostGameReducer';

function HostSubResult() {
  const { dispatcher, roomState } = useContext(HostGameContext);
  const [nextButtonName, setNextButtonName] = useState('다음퀴즈');

  const itemDatas = roomState.quizSubResult.map((cur, index) => {
    if (roomState.currentQuiz.answers.includes(index)) {
      return { ...cur, isAnswer: true };
    }

    return { ...cur, isAnswer: false };
  });

  useEffect(() => {
    if (roomState.currentQuiz.index === roomState.totalQuizCount - 1) {
      setNextButtonName('최종결과');
    }
  }, [nextButtonName]);

  function handleNextButtonClick() {
    if (roomState.currentQuiz.index === roomState.totalQuizCount - 1) {
      dispatcher({ type: HostGameAction.REQUEST_QUIZ_END });
      return;
    }
    dispatcher({ type: HostGameAction.REQUEST_NEXT_QUIZ });
  }

  return (
    <layout.CenterContentContainer>
      <layout.NextButtonWrapper>
        <GreenButton onClick={handleNextButtonClick}>
          {nextButtonName}
        </GreenButton>
      </layout.NextButtonWrapper>
      <layout.CenterLeftPanel />
      <layout.ImagePanel>
        <ScoreChart itemDatas={itemDatas} />
      </layout.ImagePanel>
      <layout.CenterRightPanel />
    </layout.CenterContentContainer>
  );
}

export default HostSubResult;
