import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';

const graphMargin = '0.75vw';
const countFontSize = '3vw';
const getItemColor = index =>
  index < colors.ITEM_COLOR.length ? colors.ITEM_COLOR[index] : 'salmon';
const Container = styled.div.attrs({
  className: 'scoreChartContainer',
})`
  position: absolute;
  display: flex;
  justify-items: center;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  height: 100%;
  width: ${props => props.width};
  margin: auto;
  overflow: hidden;
`;
const GraphBottom = styled.div`
  display: inline-flex;
  flex: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0.4rem;
  background-color: ${props => getItemColor(props.index)};
  margin-top: ${graphMargin};
`;
const ItemTitle = styled.span`
  max-width: 100%;
  max-height: 100%;
  color: white;
  font-size: 1.5vw;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const GraphTopWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  width: 100%;
`;
const GraphTopLimiter = styled.div`
  width: 100%;
  height: calc(${graphMargin} + ${countFontSize});
`;
const GraphTop = styled.div`
  position: relative;
  width: 100%;
  background-color: ${props => getItemColor(props.index)};
  animation-name: ${props => props.animationName};
  animation-fill-mode: forwards;
  animation-duration: 2s;
  animation-timing-function: linear;
`;
const GraphCount = styled.span`
  position: absolute;
  width: 100%;
  text-align: center;
  top: calc(-${graphMargin} - ${countFontSize});
  font-size: ${countFontSize};
  font-weight: bold;
  color: ${props => getItemColor(props.index)};
  ${props =>
    props.isAnswer &&
    `&::before {
      content: '정답 '
  }`}
`;
function findMaxHandler(previous, current) {
  return previous.playerCount > current.playerCount ? previous : current;
}
function findMaxCount(array) {
  return array.reduce(findMaxHandler).playerCount;
}
function getAnimation(item, maxCount) {
  const scorePercent = (item.playerCount / maxCount) * 100;
  const animationName = keyframes`
    from{
      height: 0%;
    }
    ${scorePercent}%{
      height: ${scorePercent}%;
    }
    to{
      height: ${scorePercent}%;
    }
  `;
  return animationName;
}
function convertDatasToItems(array, setState) {
  const maxCount = findMaxCount(array);
  for (let index = 0; index < array.length; index += 1) {
    const item = array[index];
    const animation = getAnimation(item, maxCount);
    item.animationName = animation;
  }
  setState(array);
}
function ScoreChart({ itemDatas }) {
  const [items, setItems] = useState([]);
  const graphWidth = `calc(${100 / items.length}% - ${graphMargin})`;
  useEffect(() => {
    convertDatasToItems(itemDatas, setItems);
  }, []);
  return (
    <Container>
      {items.map((item, index) => {
        if (!item.title) return null;
        return (
          <GraphWrapper key={item.title} width={graphWidth}>
            <GraphBottom index={index}>
              <ItemTitle>{item.title}</ItemTitle>
            </GraphBottom>
            <GraphTopWrapper>
              <GraphTop index={index} animationName={item.animationName}>
                <GraphCount index={index} isAnswer={item.isAnswer}>
                  {item.playerCount}
                </GraphCount>
              </GraphTop>
            </GraphTopWrapper>
            <GraphTopLimiter />
          </GraphWrapper>
        );
      })}
    </Container>
  );
}
ScoreChart.propTypes = {
  itemDatas: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      playerCount: PropTypes.number.isRequired,
      isAnswer: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
export default ScoreChart;
