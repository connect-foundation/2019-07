import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import Section from '../../components/edit/Section';
import EditContextProvider from '../../components/edit/EditContextProvider';
import SaveButton from '../../components/edit/SaveButton';

const Background = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${colors.BACKGROUND_DEEP_GRAY};
`;

function EditPage({ history, location }) {
  if (location.state === undefined) {
    history.push('/gameover');
    return '';
  }
  const { roomId, quizsetId } = location.state;
  return (
    <EditContextProvider>
      <Background>
        <Header>
          <SaveButton history={history} />
        </Header>
        <Section roomId={roomId} quizsetId={quizsetId} />
      </Background>
    </EditContextProvider>
  );
}

EditPage.propTypes = {
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      roomId: PropTypes.number,
      quizsetId: PropTypes.number,
    }),
  }).isRequired,
};

export default EditPage;
