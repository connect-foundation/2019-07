import React from 'react';
import styled from 'styled-components';

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
  /* text-align: center;

  width: 20rem;
  height: 10rem; */
  padding: 2rem;

  color: white;
  background-color: green;

  transform: translateY(10rem);
`;

function PlayerSubResultComponent({ isCorrect, plusScore }) {
  isCorrect = false;
  if (isCorrect === false) {
    return (
      <BackgroundRed>
        <Message>틀렸습니다.</Message>
      </BackgroundRed>
    );
  }

  return (
    <BackgroundGreen>
      <Message>맞았습니다.</Message>
      <Score>+{plusScore}</Score>
    </BackgroundGreen>
  );
}

// PlayerSubResultComponent.propTypes = {
//   isCorrect: PropTypes.bool,
//   score: PropTypes.number,
// };

export default PlayerSubResultComponent;
