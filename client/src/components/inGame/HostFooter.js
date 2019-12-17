import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import * as styles from '../../styles/common';
import DOMAIN from '../../constants/domain';

const SHAKE_POWER = 50;
const CLIPBOARD_START_POSITION = -150;
const getCenterPosition = () =>
  `transform: translateX(${CLIPBOARD_START_POSITION}%);`;
const getLeftPosition = () =>
  `transform: translateX(${CLIPBOARD_START_POSITION - SHAKE_POWER}%);`;
const getRightPosition = () =>
  `transform: translateX(${CLIPBOARD_START_POSITION + SHAKE_POWER}%);`;

const Footer = styled.footer`
  ${styles.InGameFooterStyle}
`;

const RoomUrl = styled.span`
  ${styles.InGameFooterTextStyle}
  right: 0.5rem;
  color: ${colors.TEXT_BLACK};
  cursor: copy;

  &::before {
    content: '📋';
    position: absolute;
    user-select: none;
    animation-name: ${props => props.animation};
    animation-duration: 1s;
    animation-iteration-count: 1;
    transform: translateX(${CLIPBOARD_START_POSITION}%);
  }

  &::after {
    content: '${props => props.url}';
    position: relative;
  }
`;

const FakeInput = styled.input`
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
  padding: 0;
  border: none;
  user-select: none;
  cursor: default;
`;

function getShakeAnimation() {
  return keyframes`
  0%{
    ${getCenterPosition()};
  }
  20%{
    ${getLeftPosition()};
  }
  40%{
    ${getRightPosition()};
  }
  60%{
    ${getLeftPosition()};
  }
  80%{
    ${getRightPosition()};
  }
  100%{
    ${getCenterPosition()};
  }
`;
}

function HostFooter({ roomNumber }) {
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const inputRef = useRef();
  const url = `${DOMAIN}/${roomNumber}`;
  return (
    <Footer>
      <RoomUrl
        url={url}
        animation={shakeTrigger ? getShakeAnimation() : ''}
        onAnimationEnd={() => setShakeTrigger(false)}
        onClick={() => {
          const input = inputRef.current;
          input.value = url;
          input.select();
          document.execCommand('copy');
          setShakeTrigger(true);
        }}
      />
      <FakeInput ref={inputRef} />
    </Footer>
  );
}

HostFooter.propTypes = {
  roomNumber: PropTypes.string.isRequired,
};

export default HostFooter;
