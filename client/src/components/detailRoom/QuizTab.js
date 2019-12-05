import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { YellowButton } from '../common/Buttons';

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

function QuizTab({ history }) {
  function editPage() {
    history.push({
      pathname: '/edit',
    });
  }

  return (
    <Background>
      <ButtonContainer>
        <YellowButton onClick={editPage}>퀴즈 편집</YellowButton>
      </ButtonContainer>
    </Background>
  );
}

QuizTab.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default QuizTab;
