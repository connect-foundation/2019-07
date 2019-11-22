import React from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import ItemCard from '../../components/edit/ItemCard';
import TimeLimitPicker from '../../components/edit/TimeLimitPicker';
import ScorePicker from '../../components/edit/ScorePicker';
import FlexibleInput from '../../components/common/FlexibleInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

const Section = styled.section`
  flex: 1;
  display: flex;
  color: ${colors.TEXT_BLACK};
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  flex-direction: column-reverse;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-x: hidden;
  margin: 2rem;
  padding: 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0.4rem;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
`;

const SideBar = styled.aside`
  display: flex;
  background-color: ${colors.BACKGROUND_DEEP_GRAY};
  flex-direction: row;
  width: 100%;
  height: 10rem;

  @media (min-width: 700px) {
    flex-direction: column;
    width: 20rem;
    height: 100%;
  }
`;

const AddTemplateButtonContainer = styled.div`
  position: relative;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`;

const OptionImage = styled.img.attrs({
  src: 'https://image.flaticon.com/icons/svg/483/483345.svg',
})`
  margin-left: 1rem;
  height: 50%;

  @media (min-width: 700px) {
    display: none;
  }
`;

const QuizDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  border: 1px solid black;
`;

const QuizImageContainer = styled.div`
  flex: 1;
  height: calc(100% - 4rem);
  padding: 2rem;
  border: 1px solid red;
`;

const QuizControlContainer = styled.div`
  z-index: 5;
  position: relative;
  top: 5rem;
  width: 20rem;
  height: 30rem;
`;

const ItemCardsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  border: 1px solid black;
`;

function EditPage() {
  return (
    <Container>
      <Header>
        <ButtonContainer>
          <YellowButton>저장</YellowButton>
        </ButtonContainer>
      </Header>
      <Section>
        <SideBar>
          <AddTemplateButtonContainer>
            <YellowButton>새 템플릿 추가하기</YellowButton>
          </AddTemplateButtonContainer>
        </SideBar>
        <Main>
          <TitleWrapper>
            <FlexibleInput
              maxLength={120}
              placeholder="문제를 입력해주세요."
            />
            <OptionImage />
          </TitleWrapper>
          <QuizDetailContainer>
            <QuizImageContainer />
            <QuizControlContainer>
              <TimeLimitPicker />
              <ScorePicker />
            </QuizControlContainer>
          </QuizDetailContainer>
          <ItemCardsPanel>
            <ItemCard ItemCardColor="red" />
            <ItemCard ItemCardColor="blue" />
            <ItemCard ItemCardColor="green" />
            <ItemCard ItemCardColor="orange" />
            <ItemCard ItemCardColor="salmon" />
          </ItemCardsPanel>
        </Main>
      </Section>
    </Container>
  );
}

export default EditPage;
