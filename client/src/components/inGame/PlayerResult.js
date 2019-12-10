import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dashboard from '../common/Dashboard';
import * as colors from '../../constants/colors';
import { readRank } from '../../utils/fetch';

import LoadingCircle from '../common/LoadingCircle';
import goldMedalImage from '../../assets/images/goldMedal.png';
import silverMedalImage from '../../assets/images/silverMedal.png';
import bronzeMedalImage from '../../assets/images/bronzeMedal.png';

const medalImages = [goldMedalImage, silverMedalImage, bronzeMedalImage];

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
  user-select: none;
`;

const Title = styled.span`
  position: relative;
  margin: 3vmin 0;
  font-size: 8vmin;
  font-weight: bold;
`;

const RankSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 3vmin 0;
`;

const Rank = styled.div`
  height: 8vmin;

  font-size: 6vmin;
  font-weight: bold;
  text-align: center;
  color: #000;
`;

const Medal = styled.div`
  height: 8vmin;
  width: 8vmin;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  ${props => `background-image: url(${medalImages[props.rank - 1]})`};
`;

function PlayerGameResult({ ranking, roomNumber, nickname }) {
  const [rank, setRank] = useState(0);

  useEffect(() => {
    readRank(roomNumber, nickname).then(response => {
      setRank(response.rank);
    });
  }, []);

  // fetch 요청이 끝나지 않아 rank === undefined인 경우
  if (!rank) {
    return <LoadingCircle color={colors.PRIMARY_DEEP_GREEN} />;
  }

  // fetch 요청으로 rank를 받아온 경우
  if (rank) {
    return (
      <Background>
        <RankSection>
          {rank <= 3 && <Medal rank={rank} />}
          {rank > 3 && <Rank>{rank}등</Rank>}
        </RankSection>
        <Title>TOP 10</Title>
        <Dashboard ranking={ranking} />
      </Background>
    );
  }
}

PlayerGameResult.propTypes = {
  ranking: PropTypes.shape.isRequired,
  roomNumber: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default PlayerGameResult;
