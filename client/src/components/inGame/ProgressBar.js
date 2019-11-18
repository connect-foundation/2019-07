import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const ProgressBarBackground = styled.div`
 position: relative;
 justify-self: flex-end;
 height: 2rem;
 width: 100%;
 margin-top: auto;
 border-radius: 1rem;
 background-color: ${colors.PRIMARY_DEEP_YELLOW};
`;

const ProgressAnimation = keyframes`
   from {
       width: 0;
   }
   to{
       width: 100%;
   }
`;

const ProgressBarContent = styled.div`
 height: 100%;
 border-radius: 1rem;
 background-color: ${colors.PRIMARY_DEEP_GREEN};
 animation: ${ProgressAnimation} ${(props) => props.animationDurationSeconds}s
   linear forwards;
`;

function ProgressBar({ animationDurationSeconds }) {
  return (
    <ProgressBarBackground>
      <ProgressBarContent animationDurationSeconds={animationDurationSeconds} />
    </ProgressBarBackground>
  );
}

ProgressBar.propTypes = {
  animationDurationSeconds: PropTypes.number.isRequired,
};

export default ProgressBar;
