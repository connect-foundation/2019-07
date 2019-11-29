import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const ButtonWrapper = styled.div.attrs({
  className: 'buttonWrapper',
})`
  position: relative;
  display: flex;
`;

const ButtonTop = styled.button`
  position: relative;
  flex: 1;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.fontColor};
  filter: brightness(100%);
  border-radius: 0.5rem;
  border: none;
  font-weight: bold;
  font-size: 2rem;
  padding: 1rem;
  text-shadow: black 0.1rem 0.1rem;
  user-select: none;
  transform: translateY(-0.3rem);
  transition: transform 0.1s;
  cursor: pointer;

  &:active {
    transform: translateY(-0.1rem);
    filter: brightness(95%);
  }
  &:focus {
    outline: 0;
  }

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    &:hover {
      transform: translateY(-0.1rem);
    }
  }
`;

const ButtonBottom = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  filter: brightness(50%);
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.3rem 0.1rem gray;
`;

function Button({ children, backgroundColor, fontColor, onClick }) {
  return (
    <ButtonWrapper>
      <ButtonBottom backgroundColor={backgroundColor} fontColor={fontColor} />
      <ButtonTop
        onClick={onClick}
        backgroundColor={backgroundColor}
        fontColor={fontColor}
      >
        {children}
      </ButtonTop>
    </ButtonWrapper>
  );
}

function YellowButton({ children, onClick }) {
  return (
    <Button
      backgroundColor={colors.PRIMARY_DEEP_YELLOW}
      fontColor={colors.TEXT_BLACK}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function GreenButton({ children, onClick }) {
  return (
    <Button
      backgroundColor={colors.PRIMARY_DEEP_GREEN}
      fontColor={colors.TEXT_WHITE}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function WhiteButton({ children, onClick }) {
  return (
    <Button
      backgroundColor={colors.BACKGROUND_LIGHT_WHITE}
      fontColor={colors.TEXT_BLACK}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

Button.defaultProps = {
  backgroundColor: colors.BACKGROUND_DEEP_GRAY,
  fontColor: colors.TEXT_BLACK,
  onClick: undefined,
};

const customButtonDefaultProps = {
  onClick: undefined,
};

GreenButton.defaultProps = customButtonDefaultProps;
YellowButton.defaultProps = customButtonDefaultProps;
WhiteButton.defaultProps = customButtonDefaultProps;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  onClick: PropTypes.func,
};

const customButtonPropTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

YellowButton.propTypes = customButtonPropTypes;
GreenButton.propTypes = customButtonPropTypes;
WhiteButton.propTypes = customButtonPropTypes;

export { Button, YellowButton, GreenButton, WhiteButton };
