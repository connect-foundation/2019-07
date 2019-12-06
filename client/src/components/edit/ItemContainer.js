import React from 'react';
import * as ingameLayout from '../inGame/Layout';
import Item from './Item';

const itemIndexes = [0, 1, 2, 3];

function ItemContainer() {
  return (
    <>
      {itemIndexes.map(itemIndex => (
        <ingameLayout.Item key={itemIndex}>
          <Item itemIndex={itemIndex} />
        </ingameLayout.Item>
      ))}
    </>
  );
}

export default ItemContainer;
