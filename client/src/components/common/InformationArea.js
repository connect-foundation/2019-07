import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InformationAreaStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 4vmin;
  color: black;
  margin-bottom: 4vmin;
`;

function InformationArea({ children }) {
  return <InformationAreaStyle>{children}</InformationAreaStyle>;
}

InformationArea.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InformationArea;
