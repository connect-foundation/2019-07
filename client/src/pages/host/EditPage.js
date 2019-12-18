import React from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

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

function EditPage() {
  const history = useHistory();
  const location = useLocation();
  if (location.state === undefined) {
    history.push('/gameover');
    return '';
  }
  const { roomId, quizsetId } = location.state;
  return (
    <EditContextProvider>
      <Background>
        <Header button={<SaveButton />} />
        <Section roomId={roomId} quizsetId={quizsetId} />
      </Background>
    </EditContextProvider>
  );
}

export default EditPage;
