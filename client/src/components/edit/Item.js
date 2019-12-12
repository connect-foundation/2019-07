import React, { useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { EditContext } from './EditContextProvider';
import * as colors from '../../constants/colors';
import checkMark from '../../assets/images/checkMark.png';

const ITEM_PADDING_VERTICAL = '1.5vmin';
const ITEM_PADDING_HORIZONTAL = '1.5vmin';

const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.fontColor};
  border-radius: 0.5rem;
  border: none;
  font-weight: bold;
  font-size: 3vmin;
  text-shadow: black 0.1rem 0.1rem;
  user-select: none;
  transform: translateY(-0.3rem);
  transition: transform 0.1s;
  z-index: initial;
`;

const ContentArea = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: ${ITEM_PADDING_VERTICAL};
  bottom: ${ITEM_PADDING_VERTICAL};
  left: ${ITEM_PADDING_HORIZONTAL};
  right: ${ITEM_PADDING_HORIZONTAL};
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  margin-right: 1vmin;
`;

const ItemInput = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 3vmin;
  padding: 2vmin;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
  color: ${colors.TEXT_WHITE};
  outline-color: black;

  transition: background-color 0.3s;
`;

const ItemCheckBox = styled.div`
  position: relative;
  flex: none;
  width: 3vmin;
  height: 3vmin;

  border: 2px solid #ffffff;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => props.isAnswer && '#65bf39'};
  background-image: url(${checkMark});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: 50% 50%;

  transition: background-color 0.2s;
`;

function Item({ itemIndex }) {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex, deleteCount } = quizsetState;
  const { items } = quizset[currentIndex];
  const { isAnswer, title } = items[itemIndex];
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = title;
  }, [currentIndex, deleteCount]);

  function updateIsAnswer(itemIsAnswer) {
    dispatch({
      type: actionTypes.UPDATE_ITEM_IS_ANSWER,
      itemIsAnswer,
      itemIndex,
    });
  }

  function onChangeHanlder(event) {
    const itemTitle = event.target.value;
    if (itemTitle.length === 0) updateIsAnswer(0);
    dispatch({ type: actionTypes.UPDATE_ITEM_TITLE, itemTitle, itemIndex });
  }

  return (
    <ItemWrapper backgroundColor={colors.ITEM_COLOR[itemIndex]}>
      <ContentArea>
        <InputWrapper>
          <ItemInput
            ref={inputRef}
            onChange={onChangeHanlder}
            backgroundColor={
              title.length === 0 ? 'white' : colors.ITEM_COLOR[itemIndex]
            }
            maxLength={75}
            placeholder={`보기 입력${itemIndex +
              1 +
              (itemIndex < 2 ? '(필수)' : '(옵션)')}`}
          />
        </InputWrapper>
        <ItemCheckBox
          isAnswer={isAnswer}
          onClick={() => {
            if (title.length === 0) return;
            updateIsAnswer(1 - isAnswer);
          }}
        />
      </ContentArea>
    </ItemWrapper>
  );
}

Item.propTypes = {
  itemIndex: PropTypes.number.isRequired,
};

export default Item;
