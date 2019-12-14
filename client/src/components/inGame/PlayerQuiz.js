import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import { Button } from '../common/Buttons';
import * as layout from './Layout';

import LoadingCircle from '../common/LoadingCircle';
import { readAnswer } from '../../utils/fetch';

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

function Selection({ currentQuiz, chooseAnswer, setIsAnswer }) {
  useEffect(() => {
    // 새로운 문제이므로, 이전의 정답결과를 초기화
    setIsAnswer(false);
  });

  return (
    <>
      <layout.Center>
        <layout.CenterContentContainer>
          <layout.CenterLeftPanel />
          <layout.ImagePanel>
            {currentQuiz.image !== null && (
              <ImageContainer image={currentQuiz.image} />
            )}
          </layout.ImagePanel>
          <layout.CenterRightPanel />
        </layout.CenterContentContainer>
      </layout.Center>
      <layout.Bottom>
        <layout.ItemContainer>
          {currentQuiz.items.map((item, index) => {
            if (!item.title) return null;
            return (
              <layout.Item key={item.title}>
                <Button
                  backgroundColor={colors.ITEM_COLOR[index]}
                  fontColor={colors.TEXT_WHITE}
                  onClick={e => chooseAnswer(index, e)}
                >
                  {item.title}
                </Button>
              </layout.Item>
            );
          })}
        </layout.ItemContainer>
      </layout.Bottom>
    </>
  );
}

function PlayerQuiz({ quizSet, roomNumber, quizIndex, setIsAnswer, nickname }) {
  const [choosed, setChoosed] = useState(false);

  const currentQuiz = quizSet[quizIndex];
  async function chooseAnswer(itemIndex) {
    setChoosed(true);
    readAnswer(roomNumber, nickname, quizIndex, itemIndex).then(response => {
      if (response.isCorrect) {
        setIsAnswer(true);
      } else {
        setIsAnswer(false);
      }
    });
  }

  return (
    <layout.Background>
      <layout.TitleContainer>
        <layout.Title>{currentQuiz.title}</layout.Title>
      </layout.TitleContainer>
      {!choosed && (
        <Selection
          currentQuiz={currentQuiz}
          chooseAnswer={chooseAnswer}
          setIsAnswer={setIsAnswer}
        />
      )}
      {choosed && <LoadingCircle color={colors.PRIMARY_DEEP_GREEN} />}
    </layout.Background>
  );
}

Selection.propTypes = {
  currentQuiz: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
    image: PropTypes.string,
  }).isRequired,
  chooseAnswer: PropTypes.func.isRequired,
  setIsAnswer: PropTypes.func.isRequired,
};

PlayerQuiz.propTypes = {
  quizSet: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
        }),
      ).isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  roomNumber: PropTypes.string.isRequired,
  quizIndex: PropTypes.number.isRequired,
  setIsAnswer: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default PlayerQuiz;
