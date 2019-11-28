import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import EditBody from '../../components/edit/EditBody';

const quizSetTemplate = [
  {
    title: '',
    image: '',
    items: [
      {
        title: '',
      },
      {
        title: '',
      },
      {
        title: '',
      },
      {
        title: '',
      },
    ],
    answers: [],
    timeLimit: 30,
    score: 1000,
  },
];

const quizSetData = [
  {
    title: '오늘 점심은 무엇을 먹었을까요',
    image: '',
    items: [
      {
        title: '밥',
      },
      {
        title: '라면',
      },
      {
        title: '만두',
      },
      {
        title: '찐빵',
      },
    ],
    answers: [0],
    timeLimit: 30,
    score: 1000,
  },
  {
    title: '제일 좋아하는 게임은 무엇일까요',
    image: '',
    items: [
      {
        title: '리그오브레전드',
      },
      {
        title: '크레이지아케이드',
      },
      {
        title: '오버워치',
      },
      {
        title: '서든어택',
      },
    ],
    answers: [2],
    timeLimit: 10,
    score: 0,
  },
  {
    title: '카훗은 만들기 쉽다',
    image: 'https://files.slack.com/files-pri/TP94WHR34-FQQ2ZAN4X/k-035.png',
    items: [
      {
        title: '예',
      },
      {
        title: '아니오',
      },
      {
        title: '',
      },
      {
        title: '',
      },
    ],
    answers: [1],
    timeLimit: 60,
    score: 2000,
  },
];

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
  background-color: ${colors.BACKGROUND_DEEP_GRAY};
  flex-direction: column-reverse;
  overflow: hidden;

  @media (min-width: 1000px) {
    flex-direction: row;
  }

  @media (min-width: 1300px) {
    flex-direction: row;
  }
`;

function EditPage() {
  const [quizSet, setQuizSet] = useState(quizSetTemplate);
  return (
    <Container>
      <Header>
        <ButtonContainer>
          <YellowButton
            onClick={() => {
              console.log(quizSet);
            }}
          >
            저장
          </YellowButton>
        </ButtonContainer>
      </Header>
      <Section>
        <EditBody quizSet={quizSet} setQuizSet={setQuizSet} />
      </Section>
    </Container>
  );
}

export default EditPage;
