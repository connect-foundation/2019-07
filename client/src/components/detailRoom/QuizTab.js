import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { YellowButton } from '../common/Buttons';
import { TEXT_BLACK } from '../../constants/colors';

const Background = styled.div`
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  button {
    font-size: 1.5rem;
  }
`;

const Information = styled.div`
  padding: 5rem;
  font-size: 3rem;
  text-align: center;
  color: ${TEXT_BLACK};
`;

function QuizTab({ history, roomId, quizsetId }) {
  function editPage() {
    history.push({
      pathname: '/edit',
      state: {
        roomId,
        quizsetId,
      },
    });
  }

  return (
    <Background>
      <ButtonContainer>
        <YellowButton onClick={editPage}>
          {quizsetId === undefined ? '퀴즈 생성' : '퀴즈 편집'}
        </YellowButton>
      </ButtonContainer>
      {!quizsetId && (
        <Information>퀴즈가 없으면 시작할 수 없습니다</Information>
      )}
    </Background>
  );
}

QuizTab.defaultProps = {
  quizsetId: undefined,
};

QuizTab.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  roomId: PropTypes.number.isRequired,
  quizsetId: PropTypes.number,
};

export default QuizTab;
