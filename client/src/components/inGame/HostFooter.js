import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import * as styles from '../../styles/common';
import DOMAIN from '../../constants/domain';
import clickImage from '../../assets/images/click.png';

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
  cursor: copy;
  user-select: none;
`;

const ClickImage = styled.img.attrs({
  src: clickImage,
})`
  left: 1rem;
  position: absolute;
  height: 60%;
  top: 50%;
  transform: translateY(-50%);
`;

const RoomUrl = styled.span`
  ${styles.InGameFooterTextStyle}
  right: 0.5rem;
  color: ${colors.TEXT_BLACK};

  &::before {
    content: '📋';
    position: absolute;
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
  const url = `${DOMAIN}/join/${roomNumber}`;

  function copyUrl() {
    const input = inputRef.current;
    input.value = url;
    input.select();
    document.execCommand('copy');
    setShakeTrigger(true);
  }

  return (
    <Footer onClick={copyUrl}>
      <ClickImage />
      <RoomUrl
        url={url}
        animation={shakeTrigger ? getShakeAnimation() : ''}
        onAnimationEnd={() => setShakeTrigger(false)}
      />
      <FakeInput ref={inputRef} />
    </Footer>
  );
}

HostFooter.propTypes = {
  roomNumber: PropTypes.string.isRequired,
};

export default HostFooter;
