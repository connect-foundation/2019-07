import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const Title = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.TEXT_BLACK};

  text-align: center;
  width: 32rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Header = styled.footer`
  position: relative;
  display: flex;
  justify-self: flex-end;
  justify-content: center;
  align-items: center;
  height: 8rem;
  border-bottom: 1px solid ${colors.BORDER_LIGHT_GRAY};

  margin-left: 0.5rem;
`;

function PlayerHeader({ title }) {
  return (
    <Header>
      <Title>{title}</Title>
    </Header>
  );
}

PlayerHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PlayerHeader;
