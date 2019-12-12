import React from 'react';
import styled from 'styled-components';

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

function PlayerSubResult() {
  return (
    <Background color={COLORS.WHITE}>
      <Message>중간에 들어오셨군요. 잠시만 기다려주세요</Message>
    </Background>
  );
}

export default PlayerSubResult;
