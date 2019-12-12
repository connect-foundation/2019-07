import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dashboard from '../common/Dashboard';
import LoadingCircle from '../common/LoadingCircle';
import { YellowButton } from '../common/Buttons';
import { readRank } from '../../utils/fetch';
import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';
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

const ButtonContainer = styled.div`
  right: 0;
  position: absolute;
  margin: 1rem;

  button {
    font-size: 1rem;
  }

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    button {
      font-size: 2rem;
    }
  }
`;

function PlayerResult({ ranking, roomNumber, nickname }) {
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

  function exit() {
    window.location.href = '/';
  }
  // fetch 요청으로 rank를 받아온 경우
  if (rank) {
    return (
      <Background>
        <ButtonContainer>
          <YellowButton onClick={exit}>나가기</YellowButton>
        </ButtonContainer>
        <RankSection>
          {rank <= 3 && <Medal rank={rank} />}
          {rank > 3 && <Rank>{rank}등</Rank>}
        </RankSection>
        <Dashboard ranking={ranking} />
      </Background>
    );
  }
}

PlayerResult.defaultProps = {
  ranking: [],
};

PlayerResult.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object),
  roomNumber: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default PlayerResult;
