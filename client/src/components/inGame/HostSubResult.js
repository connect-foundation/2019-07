import React from 'react';
import PropTypes from 'prop-types';
import { GreenButton } from '../common/Buttons';
import ScoreChart from '../common/ScoreChart';
import * as layout from './Layout';
import { HostGameAction } from '../../reducer/hostGameReducer';

function HostSubResult({ state, dispatcher }) {
  const itemDatas = state.quizSubResult.map((cur, index) => {
    if (state.currentQuiz.answers.includes(index)) {
      return { ...cur, isAnswer: true };
    }

    return { ...cur, isAnswer: false };
  });

  return (
    <layout.CenterContentContainer>
      <layout.NextButtonWrapper>
        <GreenButton
          onClick={() => {
            if (state.currentQuiz.index === state.totalQuizCount - 1) {
              dispatcher({ type: HostGameAction.REQUEST_QUIZ_END });
              return;
            }
            dispatcher({ type: HostGameAction.REQUEST_NEXT_QUIZ });
          }}
        >
          다음퀴즈
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

HostSubResult.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.array.isRequired,
    currentQuiz: PropTypes.object.isRequired,
    totalQuizCount: PropTypes.number.isRequired,
  }).isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default HostSubResult;
