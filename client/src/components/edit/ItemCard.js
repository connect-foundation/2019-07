import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import checkMark from '../../assets/images/checkMark.png';

const ItemCardWrapper = styled.div`
  position: relative;
  flex: 1 1 calc(50% - 0.5rem);
  height: calc(50% - 0.5rem);
  margin: 0 0.25rem;
  background-color: ${props => props.itemCardColor};
  border-radius: 0.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ItemInput = styled.input`
  position: relative;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% - 7rem);
  padding: 2rem 0;
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
  background: ${props => props.isChecked && '#51cf66'} url(${checkMark})
    no-repeat 50% 50%;
  background-size: 1rem 1rem;
  cursor: pointer;
  transition: background 0.3s;

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

function ItemCard({
  itemCardColor,
  index,
  item,
  isAnswer,
  handleItemCheck,
  handleItemTitleChange,
}) {
  const [isChecked, setChecked] = useState(isAnswer);
  const [title, setTitle] = useState(item.title);

  useEffect(() => {
    setChecked(isAnswer);
    setTitle(item.title);
  }, [item, isAnswer]);

  useEffect(() => {
    handleItemCheck(index, isChecked);
  }, [isChecked]);

  useEffect(() => {
    handleItemTitleChange(index, title);
  }, [title]);

  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  function handleCheckBoxClick() {
    setChecked(!isChecked);
  }

  return (
    <ItemCardWrapper itemCardColor={itemCardColor}>
      <ItemInput value={title} onChange={handleInputChange} />
      <ItemCheckBox isChecked={isChecked} onClick={handleCheckBoxClick} />
    </ItemCardWrapper>
  );
}

ItemCard.propTypes = {
  itemCardColor: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired,
  isAnswer: PropTypes.bool.isRequired,
  handleItemCheck: PropTypes.func.isRequired,
  handleItemTitleChange: PropTypes.func.isRequired,
};

export default ItemCard;
