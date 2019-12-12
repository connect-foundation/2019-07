import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { YellowButton } from '../common/Buttons';
import { readQuizsetId } from '../../utils/fetch';

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

function QuizTab({ history, roomId }) {
  const [quizsetId, setQuizsetId] = useState(undefined);

  function editPage() {
    history.push({
      pathname: '/edit',
      state: {
        roomId,
        quizsetId,
      },
    });
  }

  useEffect(() => {
    async function getQuizsetId() {
      const { data } = await readQuizsetId(roomId);
      setQuizsetId(data.quizsetId);
    }
    getQuizsetId();
  }, []);

  return (
    <Background>
      <ButtonContainer>
        <YellowButton onClick={editPage}>
          {quizsetId === undefined ? '퀴즈 생성' : '퀴즈 편집'}
        </YellowButton>
      </ButtonContainer>
    </Background>
  );
}

QuizTab.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  roomId: PropTypes.number.isRequired,
};

export default QuizTab;
