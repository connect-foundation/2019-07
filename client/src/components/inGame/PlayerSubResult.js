import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { fetchCheckAnswer } from '../../utils/fetch';

const COLORS = {
  GREEN: '#51ce66',
  RED: '#ff6b6b',
  WHITE: '#ffffff',
};

const Background = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.color};
`;

const Message = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const Score = styled.div`
  position: absolute;
  font-size: 3rem;

  padding: 2rem;

  color: #ffffff;
  background-color: #008001;

  transform: translateY(10rem);
`;

function PlayerSubResultComponent({
  choose,
  score,
  setScore,
  nickname,
  roomNumber,
  quizIndex,
}) {
  const [result, setResult] = useState({ isCorrect: undefined });
  const [plusScore, setPlus] = useState(0);

  useEffect(() => {
    fetchCheckAnswer(roomNumber, nickname, quizIndex, choose).then(response => {
      setResult(response);

      if (response.isCorrect) {
        setPlus(Number(response.score) - score);
        setScore(response.score);
      }
    });
  }, []);

  if (result.isCorrect === undefined) {
    return (
      <Background color={COLORS.WHITE}>
        <Message>정답을 확인 중 입니다.</Message>
      </Background>
    );
  }

  if (result.isCorrect === false) {
    return (
      <Background color={COLORS.RED}>
        <Message>틀렸습니다.</Message>
      </Background>
    );
  }

  if (result.isCorrect === true) {
    return (
      <Background color={COLORS.GREEN}>
        <Message>맞았습니다.</Message>
        <Score>+{plusScore}</Score>
      </Background>
    );
  }
}

PlayerSubResultComponent.propTypes = {
  choose: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  roomNumber: PropTypes.string.isRequired,
  quizIndex: PropTypes.number.isRequired,
};

export default PlayerSubResultComponent;
