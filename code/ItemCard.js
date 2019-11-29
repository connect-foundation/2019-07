import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import checkMark from "../../assets/images/checkMark.png";

// styled-components...

function ItemCard({
  itemCardColor,
  index,
  item,
  isAnswer,
  handleItemCheck,
  handleItemTitleChange
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
  handleItemTitleChange: PropTypes.func.isRequired
};

export default ItemCard;
