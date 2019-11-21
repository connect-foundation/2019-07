import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import checkMark from '../../assets/images/checkMark.png';

const ItemCardWrapper = styled.div`
  position: relative;
  flex: 1 1 calc(50% - 0.5rem);
  height: 30%;
  margin: 0 0.25rem;
  background-color: ${props => props.ItemCardColor};
  border-radius: 0.4rem;
`;

const ItemInput = styled.input`
  position: relative;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 80%;
  border: none;
  outline: none;
  background: none;
  font-size: 1.5rem;
  color: #ffffff;

  @media (min-width: 1000px) {
    font-size: 2rem;
  }
`;

const ItemCheckBox = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: ${props => props.isChecked && 'green'} url(${checkMark}) no-repeat
    50% 50%;
  background-size: 1rem 1rem;
  cursor: pointer;
  transition: 0.3s;
  @media (min-width: 1000px) {
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    background-size: 1.5rem 1.5rem;
    border: 2px solid #ffffff;
  }
`;

function ItemCard({ ItemCardColor }) {
  const [isChecked, setChecked] = useState(false);
  const [title, setTitle] = useState('');

  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  function handleCheckBoxClick() {
    setChecked(!isChecked);
  }

  return (
    <ItemCardWrapper ItemCardColor={ItemCardColor}>
      <ItemInput onChange={handleInputChange} />
      <ItemCheckBox isChecked={isChecked} onClick={handleCheckBoxClick} />
    </ItemCardWrapper>
  );
}

ItemCard.propTypes = {
  ItemCardColor: PropTypes.string.isRequired,
};

export default ItemCard;
