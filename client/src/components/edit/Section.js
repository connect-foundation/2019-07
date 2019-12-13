import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SideBar from './SideBar';
import ImageField from './ImageField';
import Title from './Title';
import ItemContainer from './ItemContainer';
import * as ingameLayout from '../inGame/Layout';
import { EditContext } from './EditContextProvider';
import { readQuizset } from '../../utils/fetch';
import Loading from '../common/Loading';

const MAIN_PADDING = '3vmin';

const Background = styled.section`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  flex: 1;

  @media (orientation: landscape) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  position: relative;
  flex: 1;
`;

const MainContentContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${MAIN_PADDING};
  bottom: ${MAIN_PADDING};
  left: ${MAIN_PADDING};
  right: ${MAIN_PADDING};
  background-color: blue;
`;

function Section({ roomId, quizsetId }) {
  const { quizsetState, dispatch, actionTypes, loadingTypes } = useContext(
    EditContext,
  );
  const { loadingType } = quizsetState;
  useEffect(() => {
    async function fetchData(tryCount) {
      if (tryCount === 0) return;
      const result = await readQuizset(quizsetId);
      if (!result.isSuccess) {
        fetchData(tryCount - 1);
        return;
      }
      const { quizset } = result.data;
      dispatch({ type: actionTypes.READ_QUIZSET, quizset });
    }
    dispatch({ type: actionTypes.RESET_DELETE_QUIZZES });

    dispatch({ type: actionTypes.UPDATE_IDS, roomId, quizsetId });

    if (quizsetId === undefined) {
      dispatch({ type: actionTypes.CREATE_QUIZ });
      return;
    }
    fetchData(3);
  }, []);

  return (
    <>
      {loadingType !== loadingTypes.IDLE ? (
        <Loading message="데이터를 불러오는 중입니다" />
      ) : (
        <Background>
          <SideBar />
          <Main>
            <MainContentContainer>
              <ingameLayout.Background>
                <ingameLayout.TitleContainer>
                  <Title />
                </ingameLayout.TitleContainer>
                <ingameLayout.Center>
                  <ingameLayout.CenterContentContainer>
                    <ingameLayout.CenterLeftPanel />
                    <ingameLayout.ImagePanel>
                      <ImageField />
                    </ingameLayout.ImagePanel>
                    <ingameLayout.CenterRightPanel />
                  </ingameLayout.CenterContentContainer>
                </ingameLayout.Center>
                <ingameLayout.Bottom>
                  <ingameLayout.ItemContainer>
                    <ItemContainer />
                  </ingameLayout.ItemContainer>
                </ingameLayout.Bottom>
              </ingameLayout.Background>
            </MainContentContainer>
          </Main>
        </Background>
      )}
    </>
  );
}

Section.defaultProps = {
  quizsetId: undefined,
};

Section.propTypes = {
  roomId: PropTypes.number.isRequired,
  quizsetId: PropTypes.number,
};

export default Section;
