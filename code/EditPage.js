import React, { useState } from "react";
import styled from "styled-components";
import * as colors from "../../constants/colors";
import Header from "../../components/common/Header";
import { YellowButton } from "../../components/common/Buttons";
import EditBody from "../../components/edit/EditBody";

const quizSetTemplate = [
  {
    title: "",
    image: "",
    items: [
      {
        title: ""
      },
      {
        title: ""
      },
      {
        title: ""
      },
      {
        title: ""
      }
    ],
    answers: [],
    timeLimit: 30,
    score: 1000
  }
];

// styled-components...

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
