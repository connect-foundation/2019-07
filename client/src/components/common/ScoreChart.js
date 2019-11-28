import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';

const graphMargin = '1.5vmin';
const getItemColor = index =>
  index < colors.ITEM_COLOR.length ? colors.ITEM_COLOR[index] : 'salmon';

const Container = styled.div.attrs({
  className: 'scoreChartContainer',
})`
  position: relative;
  display: flex;
  justify-items: center;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  height: 100%;
  width: ${props => props.width};
  margin: auto;
`;

const GraphBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  border-radius: 0.4rem;
  background-color: ${props => getItemColor(props.index)};
  margin-top: ${graphMargin};
`;

const ItemTitle = styled.span`
  max-width: 100%;
  max-height: 100%;
  color: white;
  font-size: 2.5vmin;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GraphTop = styled.div`
  position: relative;
  flex: 1;
  max-height: 0%;
  width: 100%;
  background-color: ${props => getItemColor(props.index)};

  animation-name: ${props => props.animationName};
  animation-fill-mode: forwards;
  animation-duration: 2s;
  animation-timing-function: linear;
`;

const GraphCount = styled.span`
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: ${graphMargin};
  font-size: 6vmin;
  font-weight: bold;
  color: ${props => getItemColor(props.index)};

  ${props =>
    props.isAnswer &&
    `&::before {
      content: '✓'
  }`}
`;

function findMaxHandler(previous, current) {
  return previous.count > current.count ? previous : current;
}

function findMaxCount(array) {
  return array.reduce(findMaxHandler).count;
}

function getAnimation(item, maxCount) {
  const scorePercent = (item.count / maxCount) * 100;
  const animationName = keyframes`
    from{
      max-height: 0%;
    }
    to{
      max-height: ${scorePercent}%;
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
      {items.map((item, index) => (
        <GraphWrapper key={item.title} width={graphWidth}>
          <GraphBottom index={index}>
            <ItemTitle>{item.title}</ItemTitle>
          </GraphBottom>
          <GraphTop index={index} animationName={item.animationName} />
          <GraphCount index={index} isAnswer={item.isAnswer}>
            {item.count}
          </GraphCount>
        </GraphWrapper>
      ))}
    </Container>
  );
}

ScoreChart.defaultProps = {
  itemDatas: [
    {
      title: '기본데이터입니다',
      count: 18,
      isAnswer: false,
    },
    {
      title: '수정 하지 않으면',
      count: 9,
      isAnswer: true,
    },
    {
      title: '계속 이 결과가',
      count: 2,
      isAnswer: true,
    },
    {
      title: '출력됩니다!',
      count: 4,
      isAnswer: false,
    },
    {
      title: '개수 제한은',
      count: 5,
      isAnswer: false,
    },
    {
      title: '없습니다',
      count: 10,
      isAnswer: true,
    },
  ],
};

ScoreChart.propTypes = {
  itemDatas: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      isAnswer: PropTypes.bool.isRequired,
    }),
  ),
};

export default ScoreChart;
