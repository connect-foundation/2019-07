import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

function PlayerSubResult({ plusScore, score, setScore, isAnswer }) {
  useEffect(() => {
    // 정답인 경우에만 점수를 갱신함
    if (isAnswer) {
      setScore(score + plusScore);
    }
  }, [isAnswer]);

  return (
    <>
      {!isAnswer && (
        <Background color={COLORS.RED}>
          <Message>틀렸습니다.</Message>
        </Background>
      )}
      {isAnswer && (
        <Background color={COLORS.GREEN}>
          <Message>맞았습니다.</Message>
          <Score>+{plusScore}</Score>
        </Background>
      )}
    </>
  );
}

PlayerSubResult.propTypes = {
  plusScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  isAnswer: PropTypes.bool.isRequired,
};

export default PlayerSubResult;
