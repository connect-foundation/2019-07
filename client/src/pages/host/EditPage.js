import React from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import SideBar from '../../components/edit/SideBar';
import ImageField from '../../components/edit/ImageField';
import * as ingameLayout from '../../components/inGame/Layout';
import EditContextProvider from '../../components/edit/EditContextProvider';
import Title from '../../components/edit/Title';
import ItemContainer from '../../components/edit/ItemContainer';

const MAIN_PADDING = '3vmin';

const Background = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${colors.BACKGROUND_DEEP_GRAY};
`;

const HeaderWrapper = styled.div`
  div.headerArea {
    height: 8vmin;
  }
  header {
    height: 8vmin;
  }
`;

const Section = styled.section`
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

function NewEditPage() {
  return (
    <EditContextProvider>
      <Background>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Section>
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
        </Section>
      </Background>
    </EditContextProvider>
  );
}

export default NewEditPage;
