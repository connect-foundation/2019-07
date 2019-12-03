import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import { Button } from '../common/Buttons';
import * as layout from './Layout';

function Quiz({ quizSet, currentIndex }) {
  const currentQuiz = quizSet[currentIndex];
  return (
    <layout.Background>
      <layout.TitleContainer>
        <layout.Title>{currentQuiz.title}</layout.Title>
      </layout.TitleContainer>
      <layout.Center>
        <layout.CenterContentContainer>
          <layout.CenterLeftPanel></layout.CenterLeftPanel>
          <layout.ImagePanel></layout.ImagePanel>
          <layout.CenterRightPanel></layout.CenterRightPanel>
        </layout.CenterContentContainer>
      </layout.Center>
      <layout.Bottom>
        <layout.ItemContainer>
          {currentQuiz.items.map((item, index) => (
            <layout.Item key={item.title}>
              <Button
                backgroundColor={colors.ITEM_COLOR[index]}
                fontColor={colors.TEXT_WHITE}
              >
                {item.title}
              </Button>
            </layout.Item>
          ))}
        </layout.ItemContainer>
      </layout.Bottom>
    </layout.Background>
  );
}

FullButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

HalfButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

Quiz.propTypes = {
  quizSet: PropTypes.shape({
    items: PropTypes.shape({
      title: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default Quiz;
