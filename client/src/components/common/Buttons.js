import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ButtonTop = styled.button`
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
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
  &:hover {
    transform: translateY(-0.1rem);
  }
  &:active {
    filter: brightness(105%);
  }
  &: focus {
    outline: 0;
  }
`;

const ButtonBottom = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  filter: brightness(50%);
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.3rem 0.1rem gray;
`;

function Button({
  children, backgroundColor, fontColor, onClick,
}) {
  return (
    <ButtonWrapper>
      <ButtonBottom backgroundColor={backgroundColor} fontColor={fontColor} />
      <ButtonTop onClick={onClick} backgroundColor={backgroundColor} fontColor={fontColor}>
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

const buttonDefaultProp = {
  onClick: undefined,
};

Button.defaultProps = buttonDefaultProp;
GreenButton.defaultProps = buttonDefaultProp;
YellowButton.defaultProps = buttonDefaultProp;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

YellowButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

GreenButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export { Button, YellowButton, GreenButton };
