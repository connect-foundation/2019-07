import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { fetchChoose } from '../../utils/fetch';

const BackgroundGreen = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #51ce66;
`;

const BackgroundRed = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ff6b6b;
`;

const Message = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const Score = styled.div`
  position: absolute;
  font-size: 3rem;

  padding: 2rem;

  color: white;
  background-color: green;

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
    fetchChoose(roomNumber, nickname, quizIndex, choose).then(response => {
      setResult(response);

      if (response.isCorrect) {
        setPlus(Number(response.score) - score);
        setScore(response.score);
      }
    });
  }, []);

  if (result.isCorrect === undefined) {
    return <div>정답을 확인중입니다!</div>;
  }

  if (result.isCorrect === false) {
    return (
      <BackgroundRed>
        <Message>틀렸습니다.</Message>
      </BackgroundRed>
    );
  }

  if (result.isCorrect === true) {
    return (
      <BackgroundGreen>
        <Message>맞았습니다.</Message>
        <Score>+{plusScore}</Score>
      </BackgroundGreen>
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
