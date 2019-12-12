import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import DESKTOP_MIN_WIDTH from '../../constants/media';

import * as colors from '../../constants/colors';
import goldMedalImage from '../../assets/images/goldMedal.png';
import silverMedalImage from '../../assets/images/silverMedal.png';
import bronzeMedalImage from '../../assets/images/bronzeMedal.png';

const fontSize = '1.5vmin';
const lineMarginBottom = '0.4rem';
const maxScoreLinePercent = '80';

const medalImages = [goldMedalImage, silverMedalImage, bronzeMedalImage];

const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  width: 95%;
  margin-bottom: 2rem;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 65%;
  }
`;

const Line = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(8% - ${lineMarginBottom});
  margin-bottom: ${lineMarginBottom};
  background-color: white;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.4rem;
  text-align: center;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
`;

const Order = styled.div`
  position: relative;
  width: 10%;
  align-items: center;
  justify-content: center;

  font-size: ${fontSize};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  ${props =>
    props.order < 3 &&
    `height: 100%; background-image: url(${medalImages[props.order]})`};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 5%;
  }
`;

const Nickname = styled.span`
  position: relative;
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0.3rem;
  font-size: ${fontSize};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 15%;
  }
`;

const ScoreLine = styled.div`
  position: relative;
  width: calc(20% - 1.25rem);
  height: 50%;
  background-color: ${colors.PRIMARY_DEEP_YELLOW};
  filter: ${props => `brightness(${100 - props.order * 3}%)`};
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0.8rem 0.2rem;

  animation-fill-mode: forwards;
  animation-duration: 2s;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    display: block;
    text-align: left;
    animation-name: ${props => props.animationName};
    padding: 0;
  }
`;

const Score = styled.span`
  position: relative;
  display: inline-block;
  max-width: 100%;
  font-size: ${fontSize};
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    text-align: left;
    padding-left: 1rem;
    overflow: visible;
  }
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  margin: 3vmin 0;
  font-size: 8vmin;
  font-weight: bold;
`;

function sortByHighScore(player1, player2) {
  if (player1.score < player2.score) return 1;
  if (player1.score > player2.score) return -1;
  if (player1.nickname < player2.nickname) return -1;
  if (player1.nickname > player2.nickname) return 1;
  return 0;
}

function DashBoard({ ranking }) {
  const [lines, setLines] = useState([]);
  const datas = ranking;

  useEffect(() => {
    datas.sort(sortByHighScore);
    const maxScore = datas[0].score;
    datas[0].order = 0;
    for (let index = 0; index < datas.length; index += 1) {
      const data = datas[index];
      const scorePercent = (data.score / maxScore) * maxScoreLinePercent;
      const animationName = keyframes`
        from{
          width: 0%;
        }
        to{
          width: calc(${scorePercent}% - 2rem);
        }
      `;
      data.animationName = animationName;
      data.scorePercent = scorePercent;

      if (index > 0) {
        const previousData = datas[index - 1];
        data.order =
          previousData.score === data.score ? previousData.order : index;
      }
    }
    setLines(datas);
  }, []);

  return (
    <Container>
      <Title>TOP 10</Title>
      {lines.map(data => (
        <Line key={data.nickname}>
          <Order order={data.order}>{data.order > 2 && data.order + 1}</Order>
          <Nickname>{data.nickname}</Nickname>
          <ScoreLine order={data.order} animationName={data.animationName}>
            <Score>{data.score}</Score>
          </ScoreLine>
        </Line>
      ))}
    </Container>
  );
}

DashBoard.propTypes = {
  ranking: PropTypes.arrayOf.isRequired,
};

export default DashBoard;
